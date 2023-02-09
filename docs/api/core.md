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
StorageModule<T>.getItem<K extends keyof T>(key: K): T[K] | undefined;
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
StorageModule<T>.setItem<K extends keyof T>(key: K, value: T[K]): void;
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
StorageModule<T>.removeItem<K extends keyof T>(key: K): void;
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
StorageModule<T>.clear(): void;
```

### Example

```ts
storageModule.clear();
```

## storageModule.contains()

Get whether the key exists in the storage module.

### Type

```ts
StorageModule<T>.contains(key: string): boolean
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
StorageModule<T>.size(): number;
```

### Return Value

The number of keys in the storage module.

### Example

```ts
const size = storageModule.size();
```

## storageModule.getHelper()

Get `IStorageModuleHelper` instance for storage module.

### Type

```ts
StorageModule<T>.getHelper(): IStorageModuleHelper<T>;
```

### Return Value

A `IStorageModuleHelper` instance for storage module:

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

## helper.getModule()

Get the value of the storage module as a JSON object.

### Type

```ts
IStorageModuleHelper<T>.getModule(): T;
```

### Return Value

All key-value pairs in storage module.

### Example

```ts
const valueDict = helper.getModule();
```

## helper.setModule()

Set a JSON object as the value of the storage module. <Badge text="Overlay Update" type="warning" />

### Type

```ts
IStorageModuleHelper<T>.setModule(root: T): void;
```

### Parameters

- `root: T`

  A JSON object, which will be the value of storage module.

### Example

```ts
helper.setModule({ token: 'xxx', hasSigned: true });
```

## helper.clearModule()

Clear storage module.

### Type

```ts
IStorageModuleHelper<T>.clearModule(): void;
```

### Example

```ts
helper.clearModule();
```

## helper.getStorageKey()

Get the key of storage module.

### Type

```ts
IStorageModuleHelper<T>.getStorageKey(): string;
```

### Return Value

Storage module key.

### Example

```ts
const storageModuleKey = helper.getStorageKey();
```

## helper.getStorageType()

Get the type of storage module.

### Type

```ts
IStorageModuleHelper<T>.getStorageType(): StorageType;
```

### Return Value

```ts
enum StorageType {
  LOCAL = 'local',
  SESSION = 'session',
}
```

### Example

```ts
const storageType = helper.getStorageType();
```

## helper.getExistence()

Determine whether the storage module exists.

### Type

```ts
IStorageModuleHelper<T>.getExistence(): boolean;
```

### Return Value

Whether the storage module exists.

### Example

```ts
const exist = helper.getExistence();
```

## helper.protect()

Enable [storage module protect](/guide/advanced/module-protect.html).

### Type

```ts
IStorageModuleHelper<T>.protect(): void;
```

### Example

```ts
helper.protect();
```

## helper.cancelProtect()

Disable [storage module protect](/guide/advanced/module-protect.html).

### Type

```ts
IStorageModuleHelper<T>.cancelProtect(): void;
```

### Example

```ts
helper.cancelProtect();
```
