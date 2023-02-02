import { ToRef } from '@vue/reactivity';
import { StorageHelper } from '@smart-storage/hooks';
import { Checker, CheckerKey, Resetter, ResetterKey } from '@smart-storage/shared';

export type StorageRefs<T> = Required<{
  [K in keyof T]: ToRef<T[K]>;
}>;
export type StorageResetters<T> = {
  [K in ResetterKey<keyof T>]: Resetter;
};
export type StorageCheckers<T> = {
  [K in CheckerKey<keyof T>]: Checker;
};

export type StorageReactions<T> = {
  refs: StorageRefs<T>;
  resetters: StorageResetters<T>;
  checkers: StorageCheckers<T>;
};

export type UseStorage<T> = () => StorageReactions<T>;

export type StorageSafeHelper = Omit<StorageHelper, 'clear'>;
export type UseStorageHelper = () => StorageSafeHelper;

export type CreateStorage<T> = {
  useStorage: UseStorage<T>;
  useStorageHelper: UseStorageHelper;
};
