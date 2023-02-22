---
extractApiHeaders: [2]
---

# Core API

## StorageModule()

Create a storage module.

### Type

<CodeScroll>

```ts
new StorageModule<T>(key: string, storageType: StorageType, noUniqueVerify?: boolean): StorageModule<T>;
```

</CodeScroll>

### Parameters

- `key: string`

  Key of storage module.

- `storageType: StorageType`

  <CodeScroll>

  ```ts
  enum StorageType {
    LOCAL = 'local',
    SESSION = 'session',
  }
  ```

  </CodeScroll>

- `noUniqueVerify?: boolean = false`

  If set to `true`, the `StorageModule` will not verify the uniqueness of the key.

### Return Value

A new `StorageModule` instance.

### Example

<CodeScroll>

```ts
const storageModule = new StorageModule('user_info', StorageType.LOCAL);
```

</CodeScroll>

## storageModule.getItem()

Get value of an storage item from storage module.

### Type

<CodeScroll>

```ts
StorageModule<T>.getItem<K extends keyof T>(key: K): T[K] | undefined;
```

</CodeScroll>

### Parameters

- `key: K`

  Key of storage module.

### Return Value

The value of storage item.

### Example

<CodeScroll>

```ts
const token = storageModule.getItem('token');
```

</CodeScroll>

## storageModule.setItem()

Set value for an storage item in storage module.

### Type

<CodeScroll>

```ts
StorageModule<T>.setItem<K extends keyof T>(key: K, value: T[K]): void;
```

</CodeScroll>

### Parameters

- `key: K`

  Key of storage module.

- `value: T[K]`

  New Value.

### Example

<CodeScroll>

```ts
storageModule.setItem('token', 'xxx');
```

</CodeScroll>

## storageModule.removeItem()

Delete key and its value from storage module.

### Type

<CodeScroll>

```ts
StorageModule<T>.removeItem<K extends keyof T>(key: K): void;
```

</CodeScroll>

### Parameters

- `key: K`

  Key of storage module.

### Example

<CodeScroll>

```ts
storageModule.removeItem('token');
```

</CodeScroll>

## storageModule.clear()

Delete all keys and their values from storage module.

### Type

<CodeScroll>

```ts
StorageModule<T>.clear(): void;
```

</CodeScroll>

### Example

<CodeScroll>

```ts
storageModule.clear();
```

</CodeScroll>

## storageModule.contains()

Get whether the key exists in the storage module.

### Type

<CodeScroll>

```ts
StorageModule<T>.contains(key: string): boolean
```

</CodeScroll>

### Parameters

- `key: K`

  Key of storage module.

### Return Value

Whether the key exists in the storage module.

### Example

<CodeScroll>

```ts
storageModule.contains('token');
```

</CodeScroll>

## storageModule.size()

Get the number of storage items in the storage module.

### Type

<CodeScroll>

```ts
StorageModule<T>.size(): number;
```

</CodeScroll>

### Return Value

The number of storage items in the storage module.

### Example

<CodeScroll>

```ts
const size = storageModule.size();
```

</CodeScroll>

## storageModule.getHelper()

Get `IStorageModuleHelper` instance for storage module.

### Type

<CodeScroll>

```ts
StorageModule<T>.getHelper(): IStorageModuleHelper<T>;
```

</CodeScroll>

### Return Value

A `IStorageModuleHelper` instance for storage module:

<CodeScroll>

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

</CodeScroll>

### Example

<CodeScroll>

```ts
const helper = storageModule.getHelper();
```

</CodeScroll>

## helper.getModule()

Get the value of the storage module as a JSON object.

### Type

<CodeScroll>

```ts
IStorageModuleHelper<T>.getModule(): T;
```

</CodeScroll>

### Return Value

All key-value pairs in storage module.

### Example

<CodeScroll>

```ts
const valueDict = helper.getModule();
```

</CodeScroll>

## helper.setModule()

Set a JSON object as the value of the storage module. <Badge text="Overlay Update" type="warning" />

### Type

<CodeScroll>

```ts
IStorageModuleHelper<T>.setModule(root: T): void;
```

</CodeScroll>

### Parameters

- `root: T`

  A JSON object, which will be the value of storage module.

### Example

<CodeScroll>

```ts
helper.setModule({ token: 'xxx', hasSigned: true });
```

</CodeScroll>

## helper.clearModule()

Clear storage module.

### Type

<CodeScroll>

```ts
IStorageModuleHelper<T>.clearModule(): void;
```

</CodeScroll>

### Example

<CodeScroll>

```ts
helper.clearModule();
```

</CodeScroll>

## helper.getStorageKey()

Get the key of storage module.

### Type

<CodeScroll>

```ts
IStorageModuleHelper<T>.getStorageKey(): string;
```

</CodeScroll>

### Return Value

Storage module key.

### Example

<CodeScroll>

```ts
const storageModuleKey = helper.getStorageKey();
```

</CodeScroll>

## helper.getStorageType()

Get the type of storage module.

### Type

<CodeScroll>

```ts
IStorageModuleHelper<T>.getStorageType(): StorageType;
```

</CodeScroll>

### Return Value

<CodeScroll>

```ts
enum StorageType {
  LOCAL = 'local',
  SESSION = 'session',
}
```

</CodeScroll>

### Example

<CodeScroll>

```ts
const storageType = helper.getStorageType();
```

</CodeScroll>

## helper.getExistence()

Determine whether the storage module exists.

### Type

<CodeScroll>

```ts
IStorageModuleHelper<T>.getExistence(): boolean;
```

</CodeScroll>

### Return Value

Whether the storage module exists.

### Example

<CodeScroll>

```ts
const exist = helper.getExistence();
```

</CodeScroll>

## helper.protect()

Enable [storage module protect](/guide/advanced/module-protect.html).

### Type

<CodeScroll>

```ts
IStorageModuleHelper<T>.protect(): void;
```

</CodeScroll>

### Example

<CodeScroll>

```ts
helper.protect();
```

</CodeScroll>

## helper.cancelProtect()

Disable [storage module protect](/guide/advanced/module-protect.html).

### Type

<CodeScroll>

```ts
IStorageModuleHelper<T>.cancelProtect(): void;
```

</CodeScroll>

### Example

<CodeScroll>

```ts
helper.cancelProtect();
```

</CodeScroll>
