import { type RootNode, NodeItemOperator, StorageType } from '@smart-storage/core';
import type { StorageActions, StorageInstance } from './types';

function createStorage<T>(type: StorageType, rootNodeKey: string, initial?: Partial<T>) {
  const operator = new NodeItemOperator<T>(rootNodeKey, type);

  // Only run when root node is empty
  if (initial && !operator.size) {
    operator.getRootNodeOperator().setRootNode(initial);
  }

  const storage = new Proxy(
    {},
    {
      get: (_, property: string) => ({
        get: () => operator.getItem(property),
        set: (value: string) => operator.setItem(property, value),
        remove: () => operator.removeItem(property),
      }),
    }
  ) as StorageInstance<T>;

  const storageActions: StorageActions = {
    size: () => operator.size,
    contains: (key: string) => operator.contains(key),
    clear: () => operator.clear(),
  };

  return () => ({ storage, storageActions });
}

export function createLocalStorage<T extends RootNode = RootNode>(rootNodeKey: string, initial?: Partial<T>) {
  return createStorage(StorageType.LOCAL, rootNodeKey, initial);
}

export function createSessionStorage<T extends RootNode = RootNode>(rootNodeKey: string, initial?: Partial<T>) {
  return createStorage(StorageType.SESSION, rootNodeKey, initial);
}
