---
extractApiHeaders: [2]
---

# React Hooks 类型集

## Setter

<CodeScroll>

```ts
// React.useState返回值的第二个元素的类型
type Setter<T> = Dispatch<SetStateAction<T>>;
```

</CodeScroll>

## UseState

<CodeScroll>

```ts
// React.useState的返回值
type UseState<T> = [T, Setter<T>];
```

</CodeScroll>

## SoftStorage

<CodeScroll>

```ts
type SoftStorage<T> = {
  storage: Required<{ [K in keyof T]: StorageItem<T, K> }>;
  storageHelper: StorageHelper;
  itemStateDict: Record<keyof T, UseState<T[keyof T]>>;
  properties: (keyof T)[];
};
```

</CodeScroll>

<ReferencedTypes>

- [`StorageItem`](hooks.html#storageitem)
- [`StorageHelper`](hooks.html#storagehelper)

</ReferencedTypes>

<Divider />

## SetterKey

<CodeScroll>

```ts
type SetterKey<T> = PrefixedKey<T, 'set'>;
```

</CodeScroll>

<ReferencedTypes>

- [`PrefixedKey`](shared.html#prefixedkey)

</ReferencedTypes>

## StorageState

<CodeScroll>

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

</CodeScroll>

<ReferencedTypes>

- [`ResetterKey`](shared.html#resetterkey)
- [`Resetter`](shared.html#resetter)
- [`CheckerKey`](shared.md#checkerkey)
- [`Checker`](shared.html#checker)

</ReferencedTypes>

## StateKey

<CodeScroll>

```ts
type StateKey<T> = SuffixedKeys<T, 'state'>;
```

</CodeScroll>

<ReferencedTypes>

- [`SuffixedKeys`](shared.html#suffixedkeys)

</ReferencedTypes>

## StorageStates

<CodeScroll>

```ts
type StorageStates<T> = {
  [SK in StateKey<T>]: RestoreSuffixedKey<SK, 'state'> extends keyof T
    ? StorageState<T, RestoreSuffixedKey<SK, 'state'>>
    : never;
};
```

</CodeScroll>

<Divider />

## CreateStorageOptions

[Hooks 类型集 > CreateStorageOptions](./hooks.html#createstorageoptions)
