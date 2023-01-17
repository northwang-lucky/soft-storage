import { NodeItemOperator, StorageType } from '@smart-storage/core';
import type { StorageActions, StorageInstance, UseStorage } from './types';

function createStorage<T extends object>(type: StorageType, rootNodeKey: string, initial?: Partial<T>): UseStorage<T> {
  const operator = new NodeItemOperator<T>(rootNodeKey, type);

  // Only run when root node is empty
  if (initial && !operator.size) {
    operator.getRootNodeOperator().setRootNode(initial);
  }

  const storage = new Proxy({} as StorageInstance<T>, {
    get: (_, p) => {
      const property = p as keyof T;
      return {
        get: () => operator.getItem(property),
        set: (value: T[keyof T]) => operator.setItem(property, value),
        remove: () => operator.removeItem(property),
        exist: () => operator.contains(property as string),
      };
    },
  });

  const storageActions: StorageActions = {
    size: () => operator.size,
    contains: (key: string) => operator.contains(key),
    clear: () => operator.clear(),
  };

  return () => ({ storage, storageActions });
}

export function createLocalStorage<T extends object>(rootNodeKey: string, initial?: Partial<T>): UseStorage<T> {
  return createStorage<T>(StorageType.LOCAL, rootNodeKey, initial);
}

export function createSessionStorage<T extends object>(rootNodeKey: string, initial?: Partial<T>): UseStorage<T> {
  return createStorage<T>(StorageType.SESSION, rootNodeKey, initial);
}
