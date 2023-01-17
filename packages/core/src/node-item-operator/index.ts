import { StorageType } from '../root-node-operator/types';
import { RootNodeOperator } from '../root-node-operator';

export class NodeItemOperator<T extends object> {
  /**
   * Root nodes manager
   */
  private operator: RootNodeOperator<T>;

  /**
   * @param key root storage key
   * @param storage storage instance
   */
  public constructor(key: string, storage: StorageType) {
    this.operator = new RootNodeOperator(key, storage);
  }

  /**
   * Get item from root node
   * @param key item key
   * @returns item value
   */
  public getItem<K extends keyof T>(key: K) {
    const rootNode = this.operator.getRootNode();
    return rootNode[key] ?? null;
  }

  /**
   * Set item into root node
   * @param key item key
   * @param value item value
   */
  public setItem<K extends keyof T>(key: K, value: T[K]): void {
    const rootNode = this.operator.getRootNode();
    rootNode[key] = value;
    this.operator.setRootNode(rootNode);
  }

  /**
   * Remove item from root node
   * @param key item key
   */
  public removeItem<K extends keyof T>(key: K): void {
    const rootNode = this.operator.getRootNode();
    delete rootNode[key];
    if (!Object.keys(rootNode as object).length) {
      this.clear();
      return;
    }
    this.operator.setRootNode(rootNode);
  }

  /**
   * Wether the key is contained in the root node
   * @param key item key
   * @returns existing
   */
  public contains(key: string): boolean {
    const rootNode = this.operator.getRootNode();
    return Object.prototype.hasOwnProperty.call(rootNode, key);
  }

  /**
   * Remove the root node
   */
  public clear(): void {
    this.operator.removeRootNode();
  }

  /**
   * Keys total
   */
  public get size(): number {
    return Object.keys(this.operator.getRootNode() as object).length;
  }

  /**
   * Get root node operator instance
   * @returns root node operator
   */
  public getRootNodeOperator(): RootNodeOperator<T> {
    return this.operator;
  }
}
