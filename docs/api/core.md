# Core API

## RootNode()

Create a root node.

### Type

```ts
new RootNode<T>(key: string, storageType: StorageType, outOfPool?: boolean | undefined): RootNode<T>;
```

### Parameters

- `key: string`

  Key of root node.

- `storageType: StorageType`

  ```ts
  enum StorageType {
    LOCAL = 'local',
    SESSION = 'session',
  }
  ```
