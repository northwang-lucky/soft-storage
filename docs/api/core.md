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

Get an storage item from storage module.

### Type

```ts
StorageModule<T extends object>.getItem<K extends keyof T>(key: K): NonNullable<T[K]> | undefined;
```

### Parameters

- `key: string`

  Key of storage module.

### Return Value

The value of storage item.

::: warning
If the value is `null`, `getItem()` will return `undefined`.
:::

### Example

```ts
const token = storageModule.getItem('token');
```
