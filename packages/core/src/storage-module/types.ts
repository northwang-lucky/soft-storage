import { StorageModuleSchema } from '@smart-storage/shared';
import { IStorageModuleHelper } from '../storage-module-helper/types';

export interface IStorageModule<T extends StorageModuleSchema> {
  getItem<K extends keyof T>(key: K): T[K] | undefined;
  setItem<K extends keyof T>(key: K, value: T[K]): void;
  removeItem<K extends keyof T>(key: K): void;
  contains(key: string): boolean;
  clear(): void;
  size(): number;
  getHelper(): IStorageModuleHelper<T>;
}
