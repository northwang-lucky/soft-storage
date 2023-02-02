import { RootNode, StorageType } from '@smart-storage/core';
import { DiscardStorageBaseOptions, DiscardStorageOptions } from './type';

function discardStorage<T extends object>({ type, rootNodeKey, shouldRun }: DiscardStorageBaseOptions) {
  const rootNode = new RootNode<T>(rootNodeKey, type, true);
  if (typeof shouldRun === 'boolean' ? shouldRun : shouldRun(rootNodeKey)) {
    rootNode.clear();
  }
}

export function discardLocalStorage<T extends object = object>(options: DiscardStorageOptions) {
  discardStorage<T>({ type: StorageType.LOCAL, ...options });
}

export function discardSessionStorage<T extends object = object>(options: DiscardStorageOptions) {
  discardStorage<T>({ type: StorageType.SESSION, ...options });
}
