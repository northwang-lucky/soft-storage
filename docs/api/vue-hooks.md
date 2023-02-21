---
extractApiHeaders: [2]
---

# Vue Hooks API

## createLocalStorage()

Create a storage module by `localStorage`.

### Type

```ts
function createLocalStorage<T>(options: CreateStorageOptions<T>): SmartStorage<T>;
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

The function returns an object ([`SmartStorage`](type-definition/react-hooks.html#smartstorage)) that includes some required variables for [`useStorage`](#usestorage) and [`useStorageHelper`](#usestoragehelper).

### Example

```ts
type UserInfo = {
  token?: string;
  hasSigned: boolean;
};

export const storage = createLocalStorage<UserInfo>({
  storageModuleKey: 'user_info',
  initial: { hasSigned: false },
});
```

## createSessionStorage()

Create a storage module by `sessionStorage`.

### Type

```ts
function createSessionStorage<T>(options: CreateStorageOptions<T>): SmartStorage<T>;
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

export const storage = createSessionStorage<UserInfo>({
  storageModuleKey: 'user_info',
  initial: { hasSigned: false },
});
```

## useStorage()

Get `refs`, `resetters` and `checkers` from storage module.

### Type

```ts
function useStorage<T>(storage: SmartStorage<T>): StorageReactions<T>;
```

### Parameters

- `storage: SmartStorage<T>`

  An object returned by [`createLocalStorage`](#createlocalstorage) or [`createSessionStorage`](#createsessionstorage).

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
import { storage } from './storage';
const {
  refs: { token },
  resetters: { resetToken },
  checkers: { containsToken },
} = useStorage(storage);
```

## useStorageHelper()

Get instance of storage module helper.

### Type

```ts
function useStorageHelper<T>(storage: SmartStorage<T>): StorageHelper;
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
import { storage } from './storage';
const storageHelper = useStorageHelper(storage);
```
