import {
  createLocalStorage as createLocalStorageRaw,
  createSessionStorage as createSessionStorageRaw,
  CreateStorageOptions,
  SmartStorage as SmartStorageRaw,
  useStorage,
  useStorageHelper,
} from '@smart-storage/hooks';
import { StorageModuleSchema } from '@smart-storage/shared';
import { Ref, UnwrapRef } from 'vue';
import { SmartStorage } from './types';

function createStorage<T extends StorageModuleSchema>(smartStorage: SmartStorageRaw<T>): SmartStorage<T> {
  const storage = useStorage(smartStorage);
  const storageHelper = useStorageHelper(smartStorage);

  const itemRefDict = {} as Record<keyof T, Ref<UnwrapRef<T[keyof T]>>>;
  const properties: (keyof T)[] = [];

  return { storage, storageHelper, itemRefDict, properties };
}

export function createLocalStorage<T extends StorageModuleSchema>(options: CreateStorageOptions<T>): SmartStorage<T> {
  const storage = createLocalStorageRaw<T>(options);
  return createStorage(storage);
}

export function createSessionStorage<T extends StorageModuleSchema>(options: CreateStorageOptions<T>): SmartStorage<T> {
  const storage = createSessionStorageRaw<T>(options);
  return createStorage(storage);
}
