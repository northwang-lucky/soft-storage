---
extractApiHeaders: [2]
---

# Core Types

## StorageType

```ts
enum StorageType {
  LOCAL = 'local',
  SESSION = 'session',
}
```

## IStorageModuleHelper

```ts
interface IStorageModuleHelper<T> {
  getModule(): T;
  setModule(root: T): void;
  clearModule(): void;
  getStorageKey(): string;
  getStorageType(): StorageType;
  getExistence(): boolean;
  protect(): void;
  cancelProtect(): void;
}
```

## IStorageModule

```ts
interface IStorageModule<T> {
  getItem<K extends keyof T>(key: K): T[K] | undefined;
  setItem<K extends keyof T>(key: K, value: T[K]): void;
  removeItem<K extends keyof T>(key: K): void;
  contains(key: string): boolean;
  clear(): void;
  size(): number;
  getHelper(): IStorageModuleHelper<T>;
}
```
