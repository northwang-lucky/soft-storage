---
extractApiHeaders: [2]
---

# Hooks API

## createLocalStorage()

Create a storage module by `localStorage`.

### Type

```ts
function createLocalStorage<T extends object>(options: CreateStorageOptions<T>): CreateStorage<T>;
```

### Parameters

- `options: CreateStorageOptions<T>`

  ```ts
  type CreateStorageOptions<T> = {
    /** Storage module key (must be unique) */
    storageModuleKey: string;
    /** Initial value (non-nullable properties must be initialized) */
    initial: T;
    /** Whether to enable module protection */
    protect?: boolean;
    /** Version number of the storage module */
    version?: number;
    /** Previous version number of the storage module */
    preVersion?: number;
  };
  ```

### Return Value

The function returns an object containing two hooks, [`useStorage`](#usestorage) and [`useStorageHelper`](#usestoragehelper).

```ts
type CreateStorage<T> = {
  useStorage: UseStorage<T>;
  useStorageHelper: UseStorageHelper;
};
```

### Example

```ts
interface UserInfo {
  token?: string;
  hasSigned: boolean;
}

export const { useStorage } = createLocalStorage<UserInfo>({
  storageModuleKey: 'user_info',
  initial: { hasSigned: false },
});
```

## createSessionStorage()

Create a storage module by `sessionStorage`.

### Type

```ts
function createSessionStorage<T extends object>(options: CreateStorageOptions<T>): CreateStorage<T>;
```

### Parameters

Same as [`createLocalStorage() > Parameters`](#parameters)

### Return Value

Same as [`createLocalStorage() > Return Value`](#return-value)

### Example

```ts
interface UserInfo {
  token?: string;
  hasSigned: boolean;
}

export const { useStorage } = createSessionStorage<UserInfo>({
  storageModuleKey: 'user_info',
  initial: { hasSigned: false },
});
```

## useStorage()

Get `storageInstance` from storage module.

### Type

```ts
type UseStorage<T> = () => StorageInstance<T>;
```

### Return Value

The function returns an object containing the items (type is [`StorageItem<T[K]>`](../type-definition/hooks.html#storageitem)) of storage module:

```ts
type StorageInstance<T> = Required<{
  [K in keyof T]: StorageItem<T[K]>;
}>;
```

### Example

```ts
const { token } = useStorage();
```

## useStorageHelper()

Get instance of storage module helper.

### Type

```ts
type UseStorageHelper = () => StorageHelper;
```

### Return Value

```ts
type StorageHelper = {
  size: () => number;
  clear: () => void;
  contains: (key: string) => boolean;
  initialize: () => void;
};
```

### Example

```ts
const storageHelper = useStorageHelper();
```
