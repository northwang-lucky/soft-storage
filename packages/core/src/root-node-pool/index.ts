import { StorageModuleSchema } from '@smart-storage/shared';
import { StorageType } from '../root-node-helper/types';
import { IStorageModule } from '../root-node/types';

class StorageModulePool {
  private storageModulesLocal: IStorageModule<StorageModuleSchema>[];

  private storageModulesSession: IStorageModule<StorageModuleSchema>[];

  constructor() {
    this.storageModulesLocal = [];
    this.storageModulesSession = [];
  }

  public addStorageModule(storageModule: IStorageModule<StorageModuleSchema>): void {
    const storageModules = this.getStorageModules(storageModule.getHelper().getStorageType());
    const argStorageModuleKey = storageModule.getHelper().getStorageKey();
    const exist = storageModules.some(node => node.getHelper().getStorageKey() === argStorageModuleKey);
    if (exist) {
      throw new Error(`Storage module key '${argStorageModuleKey}' is already existed!`);
    }
    storageModules.push(storageModule);
  }

  public removeStorageModule(storageModule: IStorageModule<StorageModuleSchema>): void {
    const storageModules = this.getStorageModules(storageModule.getHelper().getStorageType());
    const storageModuleKey = storageModule.getHelper().getStorageKey();
    for (let i = 0; i < storageModules.length; ++i) {
      if (storageModules[i].getHelper().getStorageKey() === storageModuleKey) {
        storageModules.splice(i, 1);
        break;
      }
    }
  }

  public contains(storageModule: IStorageModule<StorageModuleSchema>): boolean {
    const storageModules = this.getStorageModules(storageModule.getHelper().getStorageType());
    const storageModuleKey = storageModule.getHelper().getStorageKey();
    return storageModules.some(node => node.getHelper().getStorageKey() === storageModuleKey);
  }

  private getStorageModules(storageType: StorageType): IStorageModule<StorageModuleSchema>[] {
    let storageModules: IStorageModule<StorageModuleSchema>[];
    if (storageType === StorageType.LOCAL) {
      storageModules = this.storageModulesLocal;
    } else {
      storageModules = this.storageModulesSession;
    }
    return storageModules;
  }
}

export const storageModulePool = new StorageModulePool();
