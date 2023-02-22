import { IStorageModule, IStorageModuleHelper, StorageType } from '@smart-storage/core';
import { PickNonNullable, StorageModuleSchema } from '@smart-storage/shared';

export type SmartStorage<T extends StorageModuleSchema> = {
  storageModule: IStorageModule<T>;
  helper: IStorageModuleHelper<T>;
  initial: PickNonNullable<T>;
};

export type CreateStorageBaseOptions<T extends StorageModuleSchema> = {
  type: StorageType;
  storageModuleKey: string;
  protect?: boolean;
  version?: number;
  preVersion?: number;
  initial: PickNonNullable<T>;
};

export type CreateStorageOptions<T extends StorageModuleSchema> = Omit<CreateStorageBaseOptions<T>, 'type'>;
