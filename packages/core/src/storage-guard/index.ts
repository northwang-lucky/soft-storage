import { StorageType } from '../root-node-helper/types';

class StorageGuard {
  private localStorageProtectedKeys: string[];

  private sessionStorageProtectedKeys: string[];

  private originLocalStorage: Storage;

  private originSessionStorage: Storage;

  constructor() {
    this.localStorageProtectedKeys = [];
    this.sessionStorageProtectedKeys = [];
    this.originLocalStorage = localStorage;
    this.originSessionStorage = sessionStorage;
  }

  public getOriginLocalStorage() {
    return this.originLocalStorage;
  }

  public getOriginSessionStorage() {
    return this.originSessionStorage;
  }

  public addKey(storageType: StorageType, storageKey: string) {
    const protectedKeys = this.getProtectedKeys(storageType);
    const index = protectedKeys.indexOf(storageKey);
    if (index < 0) {
      protectedKeys.push(storageKey);
    }
  }

  public removeKey(storageType: StorageType, storageKey: string) {
    const protectedKeys = this.getProtectedKeys(storageType);
    const index = protectedKeys.indexOf(storageKey);
    if (index > -1) {
      protectedKeys.splice(index, 1);
    }
  }

  public disableDirectCalls(storageType: StorageType, storageKey: string) {
    const protectedKeys = this.getProtectedKeys(storageType);
    const preLen = protectedKeys.length;
    this.addKey(storageType, storageKey);
    if (preLen) {
      return;
    }

    const originStorage = this.getOriginStorage(storageType);

    const setItem = (key: string, value: string) => {
      if (protectedKeys.indexOf(key) > -1) {
        const message = `Direct calls for setItem to "${key}" are disabled! Do not use the 'protect' property if this is not your preference.`;
        throw new Error(message);
      }
      originStorage.setItem(key, value);
    };

    const removeItem = (key: string) => {
      if (protectedKeys.indexOf(key) > -1) {
        const message = `Direct calls for removeItem to "${key}" are disabled! Do not use the 'protect' property if this is not your preference.`;
        throw new Error(message);
      }
      originStorage.removeItem(key);
    };

    const clear = () => {
      const protectValues = protectedKeys.map(key => originStorage.getItem(key));
      originStorage.clear();
      protectedKeys.forEach((key, index) => {
        const value = protectValues[index];
        if (value) {
          originStorage.setItem(key, value);
        }
      });
    };

    const instance = new Proxy(originStorage, {
      get(_, p) {
        const property = p as keyof Storage;
        if (property === 'setItem') {
          return setItem;
        }
        if (property === 'removeItem') {
          return removeItem;
        }
        if (property === 'clear') {
          return clear;
        }
        if (property === 'length') {
          return originStorage.length;
        }
        return (...args: unknown[]) => originStorage[property]?.apply(originStorage, args);
      },
    });
    Object.defineProperty(window, `${storageType}Storage`, { value: instance });
  }

  public enableDirectCalls(storageType: StorageType, storageKey: string) {
    this.removeKey(storageType, storageKey);
    const protectedKeys = this.getProtectedKeys(storageType);
    if (protectedKeys.length) {
      return;
    }

    const originStorage = this.getOriginStorage(storageType);
    Object.defineProperty(window, `${storageType}Storage`, { value: originStorage });
  }

  private getProtectedKeys(storageType: StorageType) {
    return storageType === StorageType.LOCAL ? this.localStorageProtectedKeys : this.sessionStorageProtectedKeys;
  }

  private getOriginStorage(storageType: StorageType) {
    return storageType === StorageType.LOCAL ? this.originLocalStorage : this.originSessionStorage;
  }
}

export const storageGuard = new StorageGuard();
