---
extractApiHeaders: [2]
---

# Vue Hooks Types

## StorageRefs

<CodeScroll>

```ts
type StorageRefs<T> = Required<{
  [K in keyof T]: ToRef<T[K]>; // ToRef returns a Ref
}>;
```

</CodeScroll>

## StorageResetters

<CodeScroll>

```ts
type StorageResetters<T> = {
  [K in ResetterKey<keyof T>]: Resetter;
};
```

</CodeScroll>

<ReferencedTypes>

- [`ResetterKey`](shared.html#resetterkey)
- [`Resetter`](shared.html#resetter)

</ReferencedTypes>

## StorageCheckers

<CodeScroll>

```ts
type StorageCheckers<T> = {
  [K in CheckerKey<keyof T>]: Checker;
};
```

</CodeScroll>

<ReferencedTypes>

- [`CheckerKey`](shared.md#checkerkey)
- [`Checker`](shared.html#checker)

</ReferencedTypes>

## SmartStorage

<CodeScroll>

```ts
type SmartStorage<T extends StorageModuleSchema> = {
  storage: Required<{ [K in keyof T]: StorageItem<T, K> }>;
  storageHelper: StorageHelper;
  itemRefDict: Record<keyof T, Ref<UnwrapRef<T[keyof T]>> /* It's Vue's ref */>;
  properties: (keyof T)[];
};
```

</CodeScroll>

<ReferencedTypes>

- [`StorageItem`](hooks.html#storageitem)
- [`StorageHelper`](hooks.html#storagehelper)

</ReferencedTypes>

<Divider />

## StorageReactions

<CodeScroll>

```ts
type StorageReactions<T> = {
  refs: StorageRefs<T>;
  resetters: StorageResetters<T>;
  checkers: StorageCheckers<T>;
};
```

</CodeScroll>

<Divider />

## CreateStorageOptions

[Hooks Types > CreateStorageOptions](./hooks.html#createstorageoptions)
