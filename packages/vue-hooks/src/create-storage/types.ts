import { ToRef } from '@vue/reactivity';
import { StorageHelper } from '@smart-storage/hooks';
import { Checker, CheckerKey, Resetter, ResetterKey, StorageModuleSchema } from '@smart-storage/shared';

export type StorageRefs<T extends StorageModuleSchema> = Required<{
  [K in keyof T]: ToRef<T[K]>;
}>;
export type StorageResetters<T extends StorageModuleSchema> = {
  [K in ResetterKey<keyof T>]: Resetter;
};
export type StorageCheckers<T extends StorageModuleSchema> = {
  [K in CheckerKey<keyof T>]: Checker;
};

export type StorageReactions<T extends StorageModuleSchema> = {
  refs: StorageRefs<T>;
  resetters: StorageResetters<T>;
  checkers: StorageCheckers<T>;
};

export type UseStorage<T extends StorageModuleSchema> = () => StorageReactions<T>;

export type UseStorageHelper = () => StorageHelper;

export type CreateStorage<T extends StorageModuleSchema> = {
  useStorage: UseStorage<T>;
  useStorageHelper: UseStorageHelper;
};
