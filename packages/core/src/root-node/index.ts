import { IStorageModule } from './types';
import { StorageType } from '../root-node-helper/types';
import { StorageModuleHelper } from '../root-node-helper';
import { storageModulePool } from '../root-node-pool';

export class StorageModule<T extends object> implements IStorageModule<T> {
  private helper: StorageModuleHelper<T>;

  public constructor(key: string, storageType: StorageType, outOfPool?: boolean) {
    this.helper = new StorageModuleHelper(key, storageType);
    if (!outOfPool) {
      storageModulePool.addStorageModule(this);
    }
  }

  public getItem<K extends keyof T>(key: K) {
    const storageModule = this.helper.getRootValue();
    return Object.prototype.hasOwnProperty.call(storageModule, key) ? storageModule[key] : undefined;
  }

  public setItem<K extends keyof T>(key: K, value: T[K]): void {
    const storageModule = this.helper.getRootValue();
    storageModule[key] = value;
    this.helper.setRootValue(storageModule);
  }

  public removeItem<K extends keyof T>(key: K): void {
    const storageModule = this.helper.getRootValue();
    delete storageModule[key];
    if (!Object.keys(storageModule as object).length) {
      this.clear();
      return;
    }
    this.helper.setRootValue(storageModule);
  }

  public contains(key: string): boolean {
    const storageModule = this.helper.getRootValue();
    return Object.prototype.hasOwnProperty.call(storageModule, key);
  }

  public clear(): void {
    this.helper.removeRootValue();
    storageModulePool.removeStorageModule(this);
  }

  public size(): number {
    return Object.keys(this.helper.getRootValue() as object).length;
  }

  public getHelper(): StorageModuleHelper<T> {
    return this.helper;
  }
}
