import { StorageModuleSchema } from '@soft-storage/shared';

export type StorageItem<T extends StorageModuleSchema, K extends keyof T> = {
  get(): T[K];
  set(value: T[K]): void;
  reset(): void;
  exist(): boolean;
};

export type StorageInstance<T extends StorageModuleSchema> = Required<{
  [K in keyof T]: StorageItem<T, K>;
}>;
