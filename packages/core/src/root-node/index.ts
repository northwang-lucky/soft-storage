import { IRootNode } from './types';
import { StorageType } from '../root-node-helper/types';
import { RootNodeHelper } from '../root-node-helper';
import { rootNodePool } from '../root-node-pool';

export class RootNode<T extends object> implements IRootNode<T> {
  private helper: RootNodeHelper<T>;

  public constructor(key: string, storageType: StorageType, outOfPool?: boolean) {
    this.helper = new RootNodeHelper(key, storageType);
    if (!outOfPool) {
      rootNodePool.addRootNode(this);
    }
  }

  public getItem<K extends keyof T>(key: K) {
    const rootNode = this.helper.getRootValue();
    return rootNode[key] ?? undefined;
  }

  public setItem<K extends keyof T>(key: K, value: T[K]): void {
    const rootNode = this.helper.getRootValue();
    rootNode[key] = value;
    this.helper.setRootValue(rootNode);
  }

  public removeItem<K extends keyof T>(key: K): void {
    const rootNode = this.helper.getRootValue();
    delete rootNode[key];
    if (!Object.keys(rootNode as object).length) {
      this.clear();
      return;
    }
    this.helper.setRootValue(rootNode);
  }

  public contains(key: string): boolean {
    const rootNode = this.helper.getRootValue();
    return Object.prototype.hasOwnProperty.call(rootNode, key);
  }

  public clear(): void {
    this.helper.removeRootValue();
    rootNodePool.removeRootNode(this);
  }

  public size(): number {
    return Object.keys(this.helper.getRootValue() as object).length;
  }

  public getHelper(): RootNodeHelper<T> {
    return this.helper;
  }
}
