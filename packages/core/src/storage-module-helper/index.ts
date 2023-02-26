import { StorageModuleSchema } from '@soft-storage/shared';
import { IStorageModuleHelper, StorageType } from './types';
import { storageGuard } from '../storage-guard';

export class StorageModuleHelper<T extends StorageModuleSchema> implements IStorageModuleHelper<T> {
  private storage: Storage;

  private storageKey: string;

  private storageType: StorageType;

  private protectRan: boolean;

  public constructor(key: string, storageType: StorageType) {
    const originLocalStorage = storageGuard.getOriginLocalStorage();
    const originSessionStorage = storageGuard.getOriginSessionStorage();
    this.storageKey = key;
    this.storageType = storageType;
    this.storage = storageType === StorageType.LOCAL ? originLocalStorage : originSessionStorage;
    this.protectRan = false;
  }

  public getModule(): T {
    const storageModule = this.storage.getItem(this.storageKey);
    return storageModule ? JSON.parse(storageModule) : {};
  }

  public setModule(root: T): void {
    this.storage.setItem(this.storageKey, JSON.stringify(root));
    if (this.protectRan) {
      storageGuard.addKey(this.storageType, this.storageKey);
    }
  }

  public clearModule(): void {
    this.storage.removeItem(this.storageKey);
    if (this.protectRan) {
      storageGuard.removeKey(this.storageType, this.storageKey);
    }
  }

  public getStorageKey(): string {
    return this.storageKey;
  }

  public getStorageType(): StorageType {
    return this.storageType;
  }

  public getExistence(): boolean {
    const storageModule = this.storage.getItem(this.storageKey);
    return Boolean(storageModule);
  }

  public protect(): void {
    if (!this.protectRan) {
      this.protectRan = true;
      storageGuard.disableDirectCalls(this.storageType, this.storageKey);
    }
  }

  public cancelProtect(): void {
    if (this.protectRan) {
      this.protectRan = false;
      storageGuard.enableDirectCalls(this.storageType, this.storageKey);
    }
  }
}
