---
extractApiHeaders: [2]
---

# React Hooks Types

## Setter

```ts
// The type of the second item returned by React.useState.
type Setter<T> = Dispatch<SetStateAction<T>>;
```

## SetterKey

```ts
type SetterKey<T> = PrefixedKey<T, 'set'>;
```

<ReferencedTypes>

- [`PrefixedKey`](shared.html#prefixedkey)

</ReferencedTypes>

## StorageState

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

<ReferencedTypes>

- [`ResetterKey`](shared.html#resetterkey)
- [`Resetter`](shared.html#resetter)
- [`CheckerKey`](shared.md#checkerkey)
- [`Checker`](shared.html#checker)

</ReferencedTypes>

## StateKey

```ts
type StateKey<T> = SuffixedKeys<T, 'state'>;
```

<ReferencedTypes>

- [`SuffixedKeys`](shared.html#suffixedkeys)

</ReferencedTypes>

## StorageStates

```ts
type StorageStates<T> = {
  [SK in StateKey<T>]: RestoreSuffixedKey<SK, 'state'> extends keyof T
    ? StorageState<T, RestoreSuffixedKey<SK, 'state'>>
    : never;
};
```

## UseState

```ts
type UseState<T> = [T, Setter<T>];
```

## UseStorage

```ts
type UseStorage<T> = () => StorageStates<T>;
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
