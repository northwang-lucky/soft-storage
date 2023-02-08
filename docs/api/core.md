---
extractApiHeaders: [2]
---

# Core API

## StorageModule()

Create a storage module.

### Type

```ts
new StorageModule<T>(key: string, storageType: StorageType, outOfPool?: boolean): StorageModule<T>;
```

### Parameters

- `key: string`

  Key of storage module.

- `storageType: StorageType`

  ```ts
  enum StorageType {
    LOCAL = 'local',
    SESSION = 'session',
  }
  ```

- `outOfPool?: boolean = false`

  If set to `true`, the `StorageModule` will not verify the uniqueness of the key.

### Return Value

A new `StorageModule` instance.

### Example

```ts
const storageModule = new StorageModule('user_info', StorageType.LOCAL);
```

## storageModule.getItem()

Get value of an storage item from storage module.

### Type

```ts
StorageModule<T extends object>.getItem<K extends keyof T>(key: K): T[K] | undefined;
```

### Parameters

- `key: K`

  Key of storage module.

### Return Value

The value of storage item.

### Example

```ts
const token = storageModule.getItem('token');
```

## storageModule.setItem()

Set value for an storage item in storage module.

### Type

```ts
StorageModule<T extends object>.setItem<K extends keyof T>(key: K, value: T[K]): void;
```

### Parameters

- `key: K`
  
  Key of storage module.

- `value: T[K]`

  New Value.

### Example

```ts
storageModule.setItem('token', 'xxx');
```

## storageModule.removeItem()

Delete key and its value from storage module.

### Type

```ts
StorageModule<T extends object>.removeItem<K extends keyof T>(key: K): void;
```

### Parameters

- `key: K`
  
  Key of storage module.

### Example

```ts
storageModule.removeItem('token');
```

## storageModule.clear()

Delete all keys and their values from storage module.

### Type

```ts
StorageModule<T extends object>.clear(): void;
```

### Example

```ts
storageModule.clear();
```

## storageModule.contains()

Get whether the key exists in the storage module.

### Type

```ts
StorageModule<T extends object>.contains(key: string): boolean
```

### Parameters

- `key: K`
  
  Key of storage module.

### Return Value

Whether the key exists in the storage module.

### Example

```ts
storageModule.contains('token');
```

## storageModule.size()

Get the number of keys in the storage module.

### Type

```ts
StorageModule<T extends object>.size(): number;
```

### Return Value

The number of keys in the storage module.

### Example

```ts
const size = storageModule.size();
```

## storageModule.getHelper()

Get `StorageModuleHelper` instance for storage module.

### Type

```ts
StorageModule<T extends object>.getHelper(): IStorageModuleHelper<T>;
```

### Return Value

A `StorageModuleHelper` instance for storage module:

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

### Example

```ts
const helper = storageModule.getHelper();
```
