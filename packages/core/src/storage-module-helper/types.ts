import { StorageModuleSchema } from '@smart-storage/shared';

export enum StorageType {
  LOCAL = 'local',
  SESSION = 'session',
}

export interface IStorageModuleHelper<T extends StorageModuleSchema> {
  getModule(): T;
  setModule(root: T): void;
  clearModule(): void;
  getStorageKey(): string;
  getStorageType(): StorageType;
  getExistence(): boolean;
  protect(): void;
  cancelProtect(): void;
}
