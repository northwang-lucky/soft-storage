import { StorageType } from '../root-node-helper/types';
import { IStorageModule } from '../root-node/types';

class StorageModulePool {
  private storageModulesLocal: IStorageModule<object>[];

  private storageModulesSession: IStorageModule<object>[];

  constructor() {
    this.storageModulesLocal = [];
    this.storageModulesSession = [];
  }

  public addStorageModule(storageModule: IStorageModule<object>) {
    const storageModules = this.getStorageModules(storageModule);
    const argStorageModuleKey = storageModule.getHelper().getStorageKey();
    const exist = storageModules.some(node => node.getHelper().getStorageKey() === argStorageModuleKey);
    if (exist) {
      throw new Error(`Storage module key '${argStorageModuleKey}' is already existed!`);
    }
    storageModules.push(storageModule);
  }

  public removeStorageModule(storageModule: IStorageModule<object>) {
    const storageModules = this.getStorageModules(storageModule);
    const storageModuleKey = storageModule.getHelper().getStorageKey();
    for (let i = 0; i < storageModules.length; ++i) {
      if (storageModules[i].getHelper().getStorageKey() === storageModuleKey) {
        storageModules.splice(i, 1);
        break;
      }
    }
  }

  public contains(storageModule: IStorageModule<object>): boolean {
    const storageModules = this.getStorageModules(storageModule);
    const storageModuleKey = storageModule.getHelper().getStorageKey();
    return storageModules.some(node => node.getHelper().getStorageKey() === storageModuleKey);
  }

  private getStorageModules(storageModule: IStorageModule<object>) {
    let storageModules: IStorageModule<object>[];
    if (storageModule.getHelper().getStorageType() === StorageType.LOCAL) {
      storageModules = this.storageModulesLocal;
    } else {
      storageModules = this.storageModulesSession;
    }
    return storageModules;
  }
}

export const storageModulePool = new StorageModulePool();
