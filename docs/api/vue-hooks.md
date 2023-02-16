---
extractApiHeaders: [2]
---

# Vue Hooks API

## createLocalStorage()

Create a storage module by `localStorage`.

### Type

```ts
function createLocalStorage<T>(options: CreateStorageOptions<T>): CreateStorage<T>;
```

### Parameters

- `options: CreateStorageOptions<T>`

  ```ts
  type CreateStorageOptions<T> = {
    /* Storage module key (must be unique) */
    storageModuleKey: string;
    /* Initial value (non-nullable properties must be initialized, 
    and optional properties cannot be initialized) */
    initial: PickNonNullable<T>;
    /* Whether to enable module protection */
    protect?: boolean;
    /* Version number of the storage module */
    version?: number;
    /* Previous version number of the storage module */
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
type UserInfo = {
  token?: string;
  hasSigned: boolean;
};

export const { useStorage } = createLocalStorage<UserInfo>({
  storageModuleKey: 'user_info',
  initial: { hasSigned: false },
});
```

## createSessionStorage()

Create a storage module by `sessionStorage`.

### Type

```ts
function createSessionStorage<T>(options: CreateStorageOptions<T>): CreateStorage<T>;
```

### Parameters

Same as [`createLocalStorage() > Parameters`](#parameters)

### Return Value

Same as [`createLocalStorage() > Return Value`](#return-value)

### Example

```ts
type UserInfo = {
  token?: string;
  hasSigned: boolean;
};

export const { useStorage } = createSessionStorage<UserInfo>({
  storageModuleKey: 'user_info',
  initial: { hasSigned: false },
});
```

## useStorage()

Get `refs`, `resetters` and `checkers` from storage module.

### Type

```ts
type UseStorage<T> = () => StorageReactions<T>;
```

### Return Value

The function returns an object containing:

- [`refs: StorageRefs<T>`](type-definition/vue-hooks.html#storagerefs)
- [`resetters: StorageResetters<T>`](type-definition/vue-hooks.html#storageresetters)
- [`checkers: StorageCheckers<T>`](type-definition/vue-hooks.html#storagecheckers)

```ts
type StorageReactions<T> = {
  refs: StorageRefs<T>;
  resetters: StorageResetters<T>;
  checkers: StorageCheckers<T>;
};
```

### Example

```ts
const {
  refs: { token },
  resetters: { resetToken },
  checkers: { containsToken },
} = useStorage();
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
  contains: (key: string) => boolean;
  size: () => number;
  initialize: () => void;
};
```

### Example

```ts
const storageHelper = useStorageHelper();
```
