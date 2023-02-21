import { StorageType } from '@smart-storage/core';
import { StorageModuleSchema } from '@smart-storage/shared';
import { CreateStorageBaseOptions, CreateStorageOptions, SmartStorage } from './types';
import { processVersion } from './version';

function createStorage<T extends StorageModuleSchema>({
  type,
  storageModuleKey,
  protect = false,
  version = 1,
  preVersion,
  initial,
}: CreateStorageBaseOptions<T>): SmartStorage<T> {
  const storageModule = processVersion<T>(storageModuleKey, type, version, preVersion);
  const helper = storageModule.getHelper();

  // Only run when storage module is empty
  if (initial && !storageModule.size()) {
    helper.setModule(initial);
  }

  // Enable storage key protect
  if (protect) {
    helper.protect();
  } else {
    helper.cancelProtect();
  }

  return { storageModule, helper, initial };
}

export function createLocalStorage<T extends StorageModuleSchema>(options: CreateStorageOptions<T>): SmartStorage<T> {
  return createStorage<T>(Object.assign({ type: StorageType.LOCAL }, options));
}

export function createSessionStorage<T extends StorageModuleSchema>(options: CreateStorageOptions<T>): SmartStorage<T> {
  return createStorage<T>(Object.assign({ type: StorageType.SESSION }, options));
}
