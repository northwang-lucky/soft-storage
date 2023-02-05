# Vue Hooks API

## createLocalStorage()

Create a storage module by `localStorage`, and return a object includes two hooks: `useStorage` and `useStorageHelper`.

- **Type**

  ```ts
  function createLocalStorage<T extends object>(options: CreateStorageOptions<T>): CreateStorage<T>;
  ```

- **Parameters**

  - `options`

    | Name          | Type               | Required | Defaults | Comment                                                                               |
    | ------------- | ------------------ | -------- | -------- | ------------------------------------------------------------------------------------- |
    | `rootNodeKey` | `string`           | true     | -        | Storage module key (must be unique)                                                   |
    | `initial`     | `T extends object` | true     | -        | The initial value of the storage module (non-nullable properties must be initialized) |
