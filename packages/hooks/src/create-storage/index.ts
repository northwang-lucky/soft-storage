import { StorageType } from '@smart-storage/core';
import { processVersion } from './version';
import { CreateStorageBaseOptions, CreateStorageOptions, StorageInstance, CreateStorage } from './types';

function createStorage<T extends object>({
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
    helper.setRootValue(initial);
  }

  // Enable storage key protect
  if (protect) {
    helper.protect();
  } else {
    helper.cancelProtect();
  }

  return {
    useStorage: () => {
      return new Proxy({} as StorageInstance<T>, {
        get: (_, p) => {
          const property = p as keyof T;
          return {
            get: () => storageModule.getItem(property),
            set: (value: T[keyof T]) => storageModule.setItem(property, value),
            remove: () => storageModule.removeItem(property),
            exist: () => storageModule.contains(property as string),
          };
        },
      });
    },
    useStorageHelper: () => ({
      // The function storageModule.size contains this pointer inside
      //  please do not use the function directly for assignment
      size: () => storageModule.size(),
      clear: () => storageModule.clear(),
      contains: (key: string) => storageModule.contains(key),
      initialize: () => helper.setRootValue(initial),
    }),
  };
}

export function createLocalStorage<T extends object>(options: CreateStorageOptions<T>): CreateStorage<T> {
  return createStorage<T>({ type: StorageType.LOCAL, ...options });
}

export function createSessionStorage<T extends object>(options: CreateStorageOptions<T>): CreateStorage<T> {
  return createStorage<T>({ type: StorageType.SESSION, ...options });
}
