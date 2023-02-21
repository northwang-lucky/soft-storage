---
extractApiHeaders: [2]
---

# Vue Hooks 类型集

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

## SmartStorage

```ts
type SmartStorage<T extends StorageModuleSchema> = {
  storage: Required<{ [K in keyof T]: StorageItem<T, K> }>;
  storageHelper: StorageHelper;
  itemRefDict: Record<keyof T, Ref<UnwrapRef<T[keyof T]>> /* It's Vue's ref */>;
  properties: (keyof T)[];
};
```

<ReferencedTypes>

- [`StorageItem`](hooks.html#storageitem)
- [`StorageHelper`](hooks.html#storagehelper)

</ReferencedTypes>

<Divider />

## StorageReactions

```ts
type StorageReactions<T> = {
  refs: StorageRefs<T>;
  resetters: StorageResetters<T>;
  checkers: StorageCheckers<T>;
};
```

<Divider />

## CreateStorageOptions

[Hooks 类型集 > CreateStorageOptions](./hooks.html#createstorageoptions)
