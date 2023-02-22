---
extractApiHeaders: [2]
---

# Hooks 类型集

## SmartStorage

<CodeScroll>

```ts
type SmartStorage<T> = {
  storageModule: IStorageModule<T>;
  helper: IStorageModuleHelper<T>;
  initial: PickNonNullable<T>;
};
```

</CodeScroll>

<ReferencedTypes>

- [`IStorageModule`](core.html#istoragemodule)
- [`IStorageModuleHelper`](core.html#istoragemodulehelper)
- [`PickNonNullable`](shared.html#picknonnullable)

</ReferencedTypes>

## CreateStorageBaseOptions

<CodeScroll>

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

</CodeScroll>

<ReferencedTypes>

- [`StorageType`](core.html#storagetype)
- [`PickNonNullable`](shared.html#picknonnullable)

</ReferencedTypes>

## CreateStorageOptions

<CodeScroll>

```ts
type CreateStorageOptions<T> = Omit<CreateStorageBaseOptions<T>, 'type'>;
```

</CodeScroll>

<Divider />

## StorageItem

<CodeScroll>

```ts
type StorageItem<T, K extends keyof T> = {
  get(): T[K];
  set(value: T[K]): void;
  reset(): void;
  exist(): boolean;
};
```

</CodeScroll>

## StorageInstance

<CodeScroll>

```ts
type StorageInstance<T> = Required<{
  [K in keyof T]: StorageItem<T, K>;
}>;
```

</CodeScroll>

<Divider />

## StorageHelper

<CodeScroll>

```ts
type StorageHelper = {
  size: () => number;
  contains: (key: string) => boolean;
  initialize: () => void;
};
```

</CodeScroll>
