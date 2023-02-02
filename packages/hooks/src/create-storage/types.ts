import { StorageType } from '@smart-storage/core';

export type StorageItem<T> = {
  get(): T;
  set(value: T): void;
  remove(): void;
  exist(): boolean;
};

export type StorageInstance<T> = Required<{
  [K in keyof T]: StorageItem<T[K]>;
}>;

export type StorageHelper = {
  size: () => number;
  clear: () => void;
  contains: (key: string) => boolean;
  initialize: () => void;
};

export type UseStorage<T> = () => StorageInstance<T>;
export type UseStorageHelper = () => StorageHelper;

export type CreateStorage<T> = {
  useStorage: UseStorage<T>;
  useStorageHelper: UseStorageHelper;
};

export interface CreateStorageBaseOptions<T> {
  type: StorageType;
  rootNodeKey: string;
  protect?: boolean;
  initial: T;
}

export type CreateStorageOptions<T> = Omit<CreateStorageBaseOptions<T>, 'type'>;
