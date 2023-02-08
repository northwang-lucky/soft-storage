import { IStorageModule, StorageModule, StorageType } from '@smart-storage/core';
import { StorageModuleSchema } from '@smart-storage/shared';

export function processVersion<T extends StorageModuleSchema>(
  storageModuleKey: string,
  storageType: StorageType,
  version: number,
  preVersion = version - 1
): IStorageModule<T> {
  if (version < 1) {
    throw new Error("The minimum value of property 'version' is 1!");
  }

  if (typeof preVersion === 'number' && preVersion >= version) {
    throw new Error("Property 'preVersion' must be less than property 'version'!");
  }

  if (version === 1) {
    return new StorageModule<T>(storageModuleKey, storageType);
  }

  // Remove preStorageModuleKey and its value
  const preStorageModuleKey = preVersion > 1 ? `${storageModuleKey}_v${preVersion}` : storageModuleKey;
  const preStorageModule = new StorageModule(preStorageModuleKey, storageType, true);
  if (preStorageModule.getHelper().getExistence()) {
    preStorageModule.clear();
  }

  // Return current version's StorageModule
  return new StorageModule<T>(`${storageModuleKey}_v${version}`, storageType);
}
