import { useCallback, useState } from 'react';
import { Checker, createProxy, Resetter, StorageModuleSchema } from '@smart-storage/shared';
import {
  createLocalStorage as createLocalStorageRaw,
  createSessionStorage as createSessionStorageRaw,
  CreateStorageOptions,
  UseStorage,
  UseStorageHelper,
} from '@smart-storage/hooks';
import { CreateStorage, Setter, StateKey, StorageStates, UseState } from './types';

function createStorage<T extends StorageModuleSchema>(
  useStorage: UseStorage<T>,
  useStorageHelper: UseStorageHelper,
  { initial }: CreateStorageOptions<T>
): CreateStorage<T> {
  const storage = useStorage();
  const storageHelperRaw = useStorageHelper();

  const itemStateDict = {} as Record<keyof T, UseState<T[keyof T]>>;
  const properties: (keyof T)[] = [];

  return {
    useStorage: () => {
      const proxyGetter = useCallback((_: object, p: string) => {
        const stateKey = p as StateKey<T>;
        const property = stateKey.replace(/^([a-zA-Z]+)State$/, (_ch, first) => first) as keyof T;

        if (properties.indexOf(property) < 0) {
          properties.push(property);
        }

        const item = storage[property];
        const prevState = item.get();
        const state = useState<T[keyof T]>(prevState);
        itemStateDict[property] = state;

        const setter: Setter<T[keyof T]> = value => {
          if (value instanceof Function) {
            const newValue = value(prevState);
            item.set(newValue);
            state[1](() => newValue);
          } else {
            item.set(value);
            state[1](value);
          }
        };

        const resetter: Resetter = () => {
          if (initial && Object.prototype.hasOwnProperty.call(initial, property)) {
            state[1](initial[property]);
            item.set(initial[property]);
          } else {
            state[1](undefined as T[keyof T]);
            item.remove();
          }
        };

        const existenceChecker: Checker = () => {
          return item.exist();
        };

        const capitalize = (property as string).replace(/^[a-z]/, c => c.toUpperCase());

        return {
          [property]: state[0],
          [`set${capitalize}`]: setter,
          [`reset${capitalize}`]: resetter,
          [`contains${capitalize}`]: existenceChecker,
        };
      }, []);

      return createProxy<object, StorageStates<T>>({}, { get: proxyGetter });
    },
    useStorageHelper: () => ({
      size: () => storageHelperRaw.size(),
      contains: (key: string) => storageHelperRaw.contains(key),
      initialize: () => {
        storageHelperRaw.initialize();
        for (let i = 0; i < properties.length; ++i) {
          const key = properties[i];
          if (initial && Object.prototype.hasOwnProperty.call(initial, key)) {
            itemStateDict[key][1](() => initial[key]);
          } else {
            itemStateDict[key][1](() => undefined as T[keyof T]);
          }
        }
      },
    }),
  };
}

export function createLocalStorage<T extends StorageModuleSchema>(options: CreateStorageOptions<T>): CreateStorage<T> {
  const { useStorage, useStorageHelper } = createLocalStorageRaw<T>(options);
  return createStorage(useStorage, useStorageHelper, options);
}

export function createSessionStorage<T extends StorageModuleSchema>(
  options: CreateStorageOptions<T>
): CreateStorage<T> {
  const { useStorage, useStorageHelper } = createSessionStorageRaw<T>(options);
  return createStorage(useStorage, useStorageHelper, options);
}
