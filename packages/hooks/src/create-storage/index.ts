import { StorageType } from '@smart-storage/core';
import { processVersion } from './version';
import { CreateStorageBaseOptions, CreateStorageOptions, StorageInstance, CreateStorage } from './types';

function createStorage<T extends object>({
  type,
  rootNodeKey,
  protect = false,
  version = 1,
  preVersion,
  initial,
}: CreateStorageBaseOptions<T>): CreateStorage<T> {
  const rootNode = processVersion<T>(rootNodeKey, type, version, preVersion);
  const helper = rootNode.getHelper();

  // Only run when root node is empty
  if (initial && !rootNode.size()) {
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
            get: () => rootNode.getItem(property),
            set: (value: T[keyof T]) => rootNode.setItem(property, value),
            remove: () => rootNode.removeItem(property),
            exist: () => rootNode.contains(property as string),
          };
        },
      });
    },
    useStorageHelper: () => ({
      // The function rootNode.size contains this pointer inside
      //  please do not use the function directly for assignment
      size: () => rootNode.size(),
      clear: () => rootNode.clear(),
      contains: (key: string) => rootNode.contains(key),
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
