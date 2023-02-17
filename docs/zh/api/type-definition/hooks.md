---
extractApiHeaders: [2]
---

# Hooks 类型集

## StorageItem

```ts
type StorageItem<T, K extends keyof T> = {
  get(): T[K];
  set(value: T[K]): void;
  reset(): void;
  exist(): boolean;
};
```

## StorageHelper

```ts
type StorageInstance<T> = Required<{
  [K in keyof T]: StorageItem<T, K>;
}>;
```

## UseStorage

```ts
type UseStorage<T> = () => StorageInstance<T>;
```

## UseStorageHelper

```ts
type UseStorageHelper = () => StorageHelper;
```

## CreateStorage

```ts
type CreateStorage<T> = {
  useStorage: UseStorage<T>;
  useStorageHelper: UseStorageHelper;
};
```

## CreateStorageBaseOptions

```ts
type CreateStorageBaseOptions<T> = {
  type: StorageType;
  storageModuleKey: string;
  protect?: boolean;
  version?: number;
  preVersion?: number;
  initial: PickNonNullable<T> extends T ? PickNonNullable<T> : never;
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
