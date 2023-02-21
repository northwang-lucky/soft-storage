import { StorageHelper, StorageItem } from '@smart-storage/hooks';
import { StorageModuleSchema } from '@smart-storage/shared';
import { Dispatch, SetStateAction } from 'react';

export type Setter<T> = Dispatch<SetStateAction<T>>;
export type UseState<T> = [T, Setter<T>];

export type SmartStorage<T extends StorageModuleSchema> = {
  storage: Required<{ [K in keyof T]: StorageItem<T, K> }>;
  storageHelper: StorageHelper;
  itemStateDict: Record<keyof T, UseState<T[keyof T]>>;
  properties: (keyof T)[];
};
