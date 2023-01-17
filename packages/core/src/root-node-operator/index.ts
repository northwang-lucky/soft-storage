import { StorageType } from './types';

export class RootNodeOperator<T> {
  /**
   * Storage instance
   */
  private storage: Storage;

  /**
   * Root storage key
   */
  private storageKey: string;

  /**
   * @param key root storage key
   * @param storage storage instance
   */
  public constructor(key: string, storage: StorageType) {
    this.storageKey = key;
    this.storage = storage === StorageType.LOCAL ? localStorage : sessionStorage;
  }

  /**
   * Get the root node
   * @returns root node
   */
  public getRootNode(): T {
    const rootNode = this.storage.getItem(this.storageKey);
    return rootNode ? JSON.parse(rootNode) : {};
  }

  /**
   * Set the root node
   * @param root root node
   * @returns stringified root node
   */
  public setRootNode(root: Partial<T>): void {
    this.storage.setItem(this.storageKey, JSON.stringify(root));
  }

  /**
   * Remove the root node
   */
  public removeRootNode(): void {
    this.storage.removeItem(this.storageKey);
  }
}
