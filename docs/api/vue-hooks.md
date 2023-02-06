# Vue Hooks API

## createLocalStorage()

Create a storage module by `localStorage`.

- **Type**

  ```ts
  function createLocalStorage<T extends object>(options: CreateStorageOptions<T>): CreateStorage<T>;
  ```

- **Parameters**

  - `options: CreateStorageOptions<T>`

    ```ts
    type CreateStorageOptions<T> = {
      /** Storage module key (must be unique) */
      rootNodeKey: string;
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

- **Return Value**

  The function returns an object containing two hooks, [`useStorage`](#usestorage) and [`useStorageHelper`](#usesstoragehelper).

  ```ts
  type CreateStorage<T> = {
    useStorage: UseStorage<T>;
    useStorageHelper: UseStorageHelper;
  };
  ```

## createSessionStorage()

Create a storage module by `sessionStorage`.

- **Type**

  ```ts
  function createSessionStorage<T extends object>(options: CreateStorageOptions<T>): CreateStorage<T>;
  ```

- **Parameters**

  Same as [`createLocalStorage`](#createlocalstorage)

- **Return Value**

  Same as [`createLocalStorage`](#createlocalstorage)

## useStorage()

Get `refs`, `resetters` and `checkers` from storage module.

- **Type**

  ```ts
  type UseStorage<T> = () => StorageReactions<T>;
  ```

- **Return Value**

  The function returns an object containing:

  - [`refs: StorageRefs<T>`](../type-definition/vue-hooks.html#storagerefs)
  - [`resetters: StorageResetters<T>`](../type-definition/vue-hooks.html#storageresetters)
  - [`checkers: StorageCheckers<T>`](../type-definition/vue-hooks.html#storagecheckers)

  ```ts
  type StorageReactions<T> = {
    refs: StorageRefs<T>;
    resetters: StorageResetters<T>;
    checkers: StorageCheckers<T>;
  };
  ```

## useStorageHelper()

Get instance of storage module helper.

- **Type**

  ```ts
  type UseStorageHelper = () => StorageSafeHelper;
  ```

- **Return Value**

  ```ts
  type StorageSafeHelper = {
    contains: (key: string) => boolean;
    size: () => number;
    initialize: () => void;
  };
  ```
