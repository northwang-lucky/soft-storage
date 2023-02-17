---
extractApiHeaders: [2]
---

# Vue Hooks Types

## StorageRefs

```ts
type StorageRefs<T> = Required<{
  [K in keyof T]: ToRef<T[K]>; // ToRef returns a Ref
}>;
```

## StorageResetters

```ts
type StorageResetters<T> = {
  [K in ResetterKey<keyof T>]: Resetter;
};
```

<ReferencedTypes>

- [`ResetterKey`](shared.html#resetterkey)
- [`Resetter`](shared.html#resetter)

</ReferencedTypes>

## StorageCheckers

```ts
type StorageCheckers<T> = {
  [K in CheckerKey<keyof T>]: Checker;
};
```

<ReferencedTypes>

- [`CheckerKey`](shared.md#checkerkey)
- [`Checker`](shared.html#checker)

</ReferencedTypes>

## StorageReactions

```ts
type StorageReactions<T> = {
  refs: StorageRefs<T>;
  resetters: StorageResetters<T>;
  checkers: StorageCheckers<T>;
};
```

## UseStorage

```ts
type UseStorage<T> = () => StorageReactions<T>;
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

## CreateStorageOptions

[Hooks Types > CreateStorageOptions](./hooks.html#createstorageoptions)
