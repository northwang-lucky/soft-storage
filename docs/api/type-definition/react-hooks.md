---
extractApiHeaders: [2]
---

# React Hooks Types

## Setter

```ts
// The type of the second item returned by React.useState
type Setter<T> = Dispatch<SetStateAction<T>>;
```

## UseState

```ts
// The return type of React.useState
type UseState<T> = [T, Setter<T>];
```

## SmartStorage

```ts
type SmartStorage<T> = {
  storage: Required<{ [K in keyof T]: StorageItem<T, K> }>;
  storageHelper: StorageHelper;
  itemStateDict: Record<keyof T, UseState<T[keyof T]>>;
  properties: (keyof T)[];
};
```

<ReferencedTypes>

- [`StorageItem`](hooks.html#storageitem)
- [`StorageHelper`](hooks.html#storagehelper)

</ReferencedTypes>

<Divider />

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

<Divider />

## CreateStorageOptions

[Hooks Types > CreateStorageOptions](./hooks.html#createstorageoptions)
