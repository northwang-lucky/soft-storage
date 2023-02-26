import { StorageItem } from '@soft-storage/hooks';
import { StorageModuleSchema } from '@soft-storage/shared';
import { Ref, UnwrapRef } from 'vue';
import { StorageRefs, StorageResetters, StorageCheckers } from '../create-storage/types';

export type GetItemRefArgs<T extends StorageModuleSchema> = {
  itemRefDict: Record<keyof T, Ref<UnwrapRef<T[keyof T]>>>;
  properties: (keyof T)[];
  item: StorageItem<T, keyof T>;
};

export type StorageReactions<T extends StorageModuleSchema> = {
  refs: StorageRefs<T>;
  resetters: StorageResetters<T>;
  checkers: StorageCheckers<T>;
};
