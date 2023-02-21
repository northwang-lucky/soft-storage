import {
  createLocalStorage as createLocalStorageRaw,
  createSessionStorage as createSessionStorageRaw,
  CreateStorageOptions,
  SmartStorage as SmartStorageRaw,
  useStorage,
  useStorageHelper,
} from '@smart-storage/hooks';
import { StorageModuleSchema } from '@smart-storage/shared';
import { SmartStorage, UseState } from './types';

function createStorage<T extends StorageModuleSchema>(smartStorage: SmartStorageRaw<T>): SmartStorage<T> {
  const storage = useStorage(smartStorage);
  const storageHelper = useStorageHelper(smartStorage);

  const itemStateDict = {} as Record<keyof T, UseState<T[keyof T]>>;
  const properties: (keyof T)[] = [];

  return { storage, storageHelper, itemStateDict, properties };
}

export function createLocalStorage<T extends StorageModuleSchema>(options: CreateStorageOptions<T>): SmartStorage<T> {
  const storage = createLocalStorageRaw<T>(options);
  return createStorage(storage);
}

export function createSessionStorage<T extends StorageModuleSchema>(options: CreateStorageOptions<T>): SmartStorage<T> {
  const storage = createSessionStorageRaw<T>(options);
  return createStorage(storage);
}
