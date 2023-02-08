import { StorageType } from '@smart-storage/core';
import { ExtractNonNullable, StorageModuleSchema } from '@smart-storage/shared';

export type StorageItem<T> = {
  get(): T;
  set(value: T): void;
  remove(): void;
  reset(): void;
  exist(): boolean;
};

export type StorageInstance<T extends StorageModuleSchema> = Required<{
  [K in keyof T]: StorageItem<T[K]>;
}>;

export type StorageHelper = {
  size: () => number;
  contains: (key: string) => boolean;
  initialize: () => void;
};

export type UseStorage<T extends StorageModuleSchema> = () => StorageInstance<T>;
export type UseStorageHelper = () => StorageHelper;

export type CreateStorage<T extends StorageModuleSchema> = {
  useStorage: UseStorage<T>;
  useStorageHelper: UseStorageHelper;
};

export interface CreateStorageBaseOptions<T extends StorageModuleSchema> {
  type: StorageType;
  storageModuleKey: string;
  protect?: boolean;
  version?: number;
  preVersion?: number;
  initial: ExtractNonNullable<T> extends T ? ExtractNonNullable<T> : never;
}

export type CreateStorageOptions<T extends StorageModuleSchema> = Omit<CreateStorageBaseOptions<T>, 'type'>;
