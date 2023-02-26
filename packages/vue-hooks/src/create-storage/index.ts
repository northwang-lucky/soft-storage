import {
  createLocalStorage as createLocalStorageRaw,
  createSessionStorage as createSessionStorageRaw,
  CreateStorageOptions,
  SoftStorage as SoftStorageRaw,
  useStorage,
  useStorageHelper,
} from '@soft-storage/hooks';
import { StorageModuleSchema } from '@soft-storage/shared';
import { Ref, UnwrapRef } from 'vue';
import { SoftStorage } from './types';

function createStorage<T extends StorageModuleSchema>(softStorage: SoftStorageRaw<T>): SoftStorage<T> {
  const storage = useStorage(softStorage);
  const storageHelper = useStorageHelper(softStorage);

  const itemRefDict = {} as Record<keyof T, Ref<UnwrapRef<T[keyof T]>>>;
  const properties: (keyof T)[] = [];

  return { storage, storageHelper, itemRefDict, properties };
}

export function createLocalStorage<T extends StorageModuleSchema>(options: CreateStorageOptions<T>): SoftStorage<T> {
  const storage = createLocalStorageRaw<T>(options);
  return createStorage(storage);
}

export function createSessionStorage<T extends StorageModuleSchema>(options: CreateStorageOptions<T>): SoftStorage<T> {
  const storage = createSessionStorageRaw<T>(options);
  return createStorage(storage);
}
