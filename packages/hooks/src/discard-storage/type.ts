import { StorageType } from '@smart-storage/core';

export interface DiscardStorageBaseOptions {
  type: StorageType;
  rootNodeKey: string;
  shouldRun: boolean | ((rootNodeKey: string) => boolean);
}

export type DiscardStorageOptions = Omit<DiscardStorageBaseOptions, 'type'>;
