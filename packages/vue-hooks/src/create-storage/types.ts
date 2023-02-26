import { ToRef } from '@vue/reactivity';
import { StorageHelper, StorageItem } from '@soft-storage/hooks';
import { Checker, CheckerKey, Resetter, ResetterKey, StorageModuleSchema } from '@soft-storage/shared';
import { Ref, UnwrapRef } from 'vue';

export type StorageRefs<T extends StorageModuleSchema> = Required<{
  [K in keyof T]: ToRef<T[K]>;
}>;
export type StorageResetters<T extends StorageModuleSchema> = {
  [K in ResetterKey<keyof T>]: Resetter;
};
export type StorageCheckers<T extends StorageModuleSchema> = {
  [K in CheckerKey<keyof T>]: Checker;
};

export type SoftStorage<T extends StorageModuleSchema> = {
  storage: Required<{ [K in keyof T]: StorageItem<T, K> }>;
  storageHelper: StorageHelper;
  itemRefDict: Record<keyof T, Ref<UnwrapRef<T[keyof T]>>>;
  properties: (keyof T)[];
};
