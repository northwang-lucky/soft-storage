import {
  createLocalStorage as createLocalStorageRaw,
  createSessionStorage as createSessionStorageRaw,
  CreateStorageOptions,
  SoftStorage as SoftStorageRaw,
  useStorage,
  useStorageHelper,
} from '@soft-storage/hooks';
import { StorageModuleSchema } from '@soft-storage/shared';
import { SoftStorage, UseState } from './types';

function createStorage<T extends StorageModuleSchema>(softStorage: SoftStorageRaw<T>): SoftStorage<T> {
  const storage = useStorage(softStorage);
  const storageHelper = useStorageHelper(softStorage);

  const itemStateDict = {} as Record<keyof T, UseState<T[keyof T]>>;
  const properties: (keyof T)[] = [];

  return { storage, storageHelper, itemStateDict, properties };
}

export function createLocalStorage<T extends StorageModuleSchema>(options: CreateStorageOptions<T>): SoftStorage<T> {
  const storage = createLocalStorageRaw<T>(options);
  return createStorage(storage);
}

export function createSessionStorage<T extends StorageModuleSchema>(options: CreateStorageOptions<T>): SoftStorage<T> {
  const storage = createSessionStorageRaw<T>(options);
  return createStorage(storage);
}
