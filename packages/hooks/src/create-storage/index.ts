import { StorageType } from '@smart-storage/core';
import { createProxy, StorageModuleSchema } from '@smart-storage/shared';
import { processVersion } from './version';
import { CreateStorageBaseOptions, CreateStorageOptions, StorageInstance, CreateStorage, StorageItem } from './types';

function createStorage<T extends StorageModuleSchema>({
  type,
  storageModuleKey,
  protect = false,
  version = 1,
  preVersion,
  initial,
}: CreateStorageBaseOptions<T>): CreateStorage<T> {
  const storageModule = processVersion<T>(storageModuleKey, type, version, preVersion);
  const helper = storageModule.getHelper();

  // Only run when storage module is empty
  if (initial && !storageModule.size()) {
    helper.setModule(initial);
  }

  // Enable storage key protect
  if (protect) {
    helper.protect();
  } else {
    helper.cancelProtect();
  }

  return {
    useStorage: () => {
      const proxyGetter = (_: object, property: string): StorageItem<T, keyof T> => ({
        get: () => storageModule.getItem(property) as T[keyof T],
        set: (value: T[keyof T]) => storageModule.setItem(property, value),
        exist: () => storageModule.contains(property),
        reset: () => {
          if (Object.prototype.hasOwnProperty.call(initial, property)) {
            storageModule.setItem(property, initial[property] as T[keyof T]);
            return;
          }
          storageModule.setItem(property, undefined as T[keyof T]);
        },
      });
      return createProxy<object, StorageInstance<T>>({}, { get: proxyGetter });
    },
    useStorageHelper: () => ({
      size: () => storageModule.size(),
      contains: (key: string) => storageModule.contains(key),
      initialize: () => helper.setModule(initial),
    }),
  };
}

export function createLocalStorage<T extends StorageModuleSchema>(options: CreateStorageOptions<T>): CreateStorage<T> {
  return createStorage<T>({ type: StorageType.LOCAL, ...options });
}

export function createSessionStorage<T extends StorageModuleSchema>(
  options: CreateStorageOptions<T>
): CreateStorage<T> {
  return createStorage<T>({ type: StorageType.SESSION, ...options });
}
