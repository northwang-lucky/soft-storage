---
extractApiHeaders: [2]
---

# Hooks Types

## SmartStorage

```ts
type SmartStorage<T> = {
  storageModule: IStorageModule<T>;
  helper: IStorageModuleHelper<T>;
  initial: PickNonNullable<T>;
};
```

<ReferencedTypes>

- [`IStorageModule`](core.html#istoragemodule)
- [`IStorageModuleHelper`](core.html#istoragemodulehelper)
- [`PickNonNullable`](shared.html#picknonnullable)

</ReferencedTypes>

## CreateStorageBaseOptions

```ts
type CreateStorageBaseOptions<T> = {
  type: StorageType;
  storageModuleKey: string;
  protect?: boolean;
  version?: number;
  preVersion?: number;
  initial: PickNonNullable<T>;
};
```

<ReferencedTypes>

- [`StorageType`](core.html#storagetype)
- [`PickNonNullable`](shared.html#picknonnullable)

</ReferencedTypes>

## CreateStorageOptions

```ts
type CreateStorageOptions<T> = Omit<CreateStorageBaseOptions<T>, 'type'>;
```

<Divider />

## StorageItem

```ts
type StorageItem<T, K extends keyof T> = {
  get(): T[K];
  set(value: T[K]): void;
  reset(): void;
  exist(): boolean;
};
```

## StorageInstance

```ts
type StorageInstance<T> = Required<{
  [K in keyof T]: StorageItem<T, K>;
}>;
```

<Divider />

## StorageHelper

```ts
type StorageHelper = {
  size: () => number;
  contains: (key: string) => boolean;
  initialize: () => void;
};
```
