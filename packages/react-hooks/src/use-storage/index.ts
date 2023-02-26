import { Checker, createProxy, Resetter, restoreSuffixedString, StorageModuleSchema } from '@soft-storage/shared';
import { useCallback, useState } from 'react';
import { Setter, SoftStorage } from '../create-storage/types';
import { StateKey, StorageStates } from './types';

export function useStorage<T extends StorageModuleSchema>({
  storage,
  itemStateDict,
  properties,
}: SoftStorage<T>): StorageStates<T> {
  const proxyGetter = useCallback(
    (_: object, p: string) => {
      const stateKey = p as StateKey<T>;
      const property = restoreSuffixedString(stateKey, 'state') as keyof T;

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
        item.reset();
        state[1](item.get());
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
    },
    [itemStateDict, properties, storage]
  );

  return createProxy<object, StorageStates<T>>({}, { get: proxyGetter });
}
