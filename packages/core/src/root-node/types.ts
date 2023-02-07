import { StorageModuleHelper } from '../root-node-helper';

export interface IStorageModule<T> {
  getItem<K extends keyof T>(key: K): T[K] | undefined;
  setItem<K extends keyof T>(key: K, value: T[K]): void;
  removeItem<K extends keyof T>(key: K): void;
  contains(key: string): boolean;
  clear(): void;
  size(): number;
  getHelper(): StorageModuleHelper<T>;
}
