---
extractApiHeaders: [2]
---

# React Hooks API

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

Get `states`, `setters`, `resetters` and `checkers` from storage module.

### Type

```ts
type UseStorage<T> = () => StorageStates<T>;
```

### Return Value

The function returns a `Record` object, whose key type is [`StateKey<T>`](../type-definition/react-hooks.html#statekey), value type is [`StorageState<T, K extends keyof T>`](../type-definition/react-hooks.html#storagestate):

```ts
type StorageStates<T> = {
  [SK in StateKey<T>]: RestoreSuffixedKey<SK, 'state'> extends keyof T
    ? StorageState<T, RestoreSuffixedKey<SK, 'state'>>
    : never;
};
```

::: tip
[`RestoreSuffixedKey<SK, 'state'>`](../type-definition/shared.html#restoresuffixedkey) here is used to restore the `StateKey<T>`, for example, the "tokenState" will be restored to "token".
:::

<hr>

[`StateKey<T>`](../type-definition/react-hooks.html#statekey) is a string (such as "tokenState"):

```ts
type StateKey<T> = SuffixedKeys<T, 'state'>;
```

::: tip
[`SuffixedKeys<T, 'state'>`](../type-definition/shared.html#suffixedkeys) here is used to add suffix, for example, the "token" will become to "tokenState".
:::

<hr>

And the `StorageState<T, K extends keyof T>` is an object containing:

- `xxx: T[K]`
- [`setXxx: Setter<T[K]>`](../type-definition/react-hooks.html#setter), type of `setXxx` is [`SetterKey<K>`](../type-definition/react-hooks.html#setterkey)
- [`resetXxx: Resetter`](../type-definition/react-hooks.html#resetter), type of `resetXxx` is [`ResetterKey<K>`](../type-definition/react-hooks.html#resetterkey)
- [`containsXxx: Checker`](../type-definition/react-hooks.html#checker), type of `containsXxx` is [`CheckerKey<K>`](../type-definition/react-hooks.html#checkerkey)

```ts
type StorageState<T, K extends keyof T> = {
  [Key in K]: T[K];
} & {
  [Key in SetterKey<K>]: Setter<T[K]>;
} & {
  [Key in ResetterKey<K>]: Resetter;
} & {
  [Key in CheckerKey<K>]: Checker;
};
```

### Example

```ts
const {
  tokenState: { token, setToken, resetToken, containsToken },
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
