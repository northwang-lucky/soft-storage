---
extractApiHeaders: [2]
---

# Hooks API

## createLocalStorage()

Create a storage module by `localStorage`.

### Type

<CodeScroll>

```ts
function createLocalStorage<T>(options: CreateStorageOptions<T>): SmartStorage<T>;
```

</CodeScroll>

### Parameters

- `options: CreateStorageOptions<T>`

  <CodeScroll>

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

  </CodeScroll>

### Return Value

The function returns an object ([`SmartStorage`](type-definition/hooks.html#smartstorage)) that includes some required variables for [`useStorage`](#usestorage) and [`useStorageHelper`](#usestoragehelper).

### Example

<CodeScroll>

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

</CodeScroll>

## createSessionStorage()

Create a storage module by `sessionStorage`.

### Type

<CodeScroll>

```ts
function createSessionStorage<T>(options: CreateStorageOptions<T>): SmartStorage<T>;
```

</CodeScroll>

### Parameters

Same as [`createLocalStorage() > Parameters`](#parameters)

### Return Value

Same as [`createLocalStorage() > Return Value`](#return-value)

### Example

<CodeScroll>

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

</CodeScroll>

## useStorage()

Get `storageInstance` from storage module.

### Type

<CodeScroll>

```ts
function useStorage<T>(storage: SmartStorage<T>): StorageInstance<T>;
```

</CodeScroll>

### Parameters

- `storage: SmartStorage<T>`

  An object returned by [`createLocalStorage`](#createlocalstorage) or [`createSessionStorage`](#createsessionstorage).

### Return Value

The function returns an object containing the items (type is [`StorageItem<T[K]>`](type-definition/hooks.html#storageitem)) of storage module:

<CodeScroll>

```ts
type StorageInstance<T> = Required<{
  [K in keyof T]: StorageItem<T[K]>;
}>;
```

</CodeScroll>

### Example

<CodeScroll>

```ts
import { storage } from './storage';
const { token } = useStorage(storage);
```

</CodeScroll>

## useStorageHelper()

Get instance of storage module helper.

### Type

<CodeScroll>

```ts
function useStorageHelper<T>(storage: SmartStorage<T>): StorageHelper;
```

</CodeScroll>

### Parameters

- `storage: SmartStorage<T>`

  An object returned by [`createLocalStorage`](#createlocalstorage) or [`createSessionStorage`](#createsessionstorage).

### Return Value

<CodeScroll>

```ts
type StorageHelper = {
  size: () => number;
  contains: (key: string) => boolean;
  initialize: () => void;
};
```

</CodeScroll>

### Example

<CodeScroll>

```ts
import { storage } from './storage';
const storageHelper = useStorageHelper(storage);
```

</CodeScroll>
