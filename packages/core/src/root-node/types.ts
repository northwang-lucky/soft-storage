import { RootNodeHelper } from '../root-node-helper';

export interface IRootNode<T> {
  getItem<K extends keyof T>(key: K): NonNullable<T[K]> | undefined;
  setItem<K extends keyof T>(key: K, value: T[K]): void;
  removeItem<K extends keyof T>(key: K): void;
  contains(key: string): boolean;
  clear(): void;
  size(): number;
  getHelper(): RootNodeHelper<T>;
}
