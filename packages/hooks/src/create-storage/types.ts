import { IStorageModule, IStorageModuleHelper, StorageType } from '@smart-storage/core';
import { Initial, StorageModuleSchema } from '@smart-storage/shared';

export type SmartStorage<T extends StorageModuleSchema> = {
  storageModule: IStorageModule<T>;
  helper: IStorageModuleHelper<T>;
  initial: Initial<T>;
};

export type CreateStorageBaseOptions<T extends StorageModuleSchema> = {
  type: StorageType;
  storageModuleKey: string;
  protect?: boolean;
  version?: number;
  preVersion?: number;
  initial: Initial<T>;
};

export type CreateStorageOptions<T extends StorageModuleSchema> = Omit<CreateStorageBaseOptions<T>, 'type'>;
