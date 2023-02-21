# Shared 类型集

## Function

```ts
export type Function<T, R> = (arg: T) => R;
```

## BiFunction

```ts
export type BiFunction<T extends Array<unknown>, R> = (...arg: T) => R;
```

## Supplier

```ts
export type Supplier<R> = () => R;
```

## Runnable

```ts
export type Runnable = () => void;
```

## Consumer

```ts
export type Consumer<T> = (arg: T) => void;
```

## BiConsumer

```ts
export type BiConsumer<T extends Array<unknown>> = (...arg: T) => void;
```

<Divider />

## StorageModuleSchema

```ts
type StorageModuleSchema = Record<string, unknown>;
```

## Initial

```ts
type Initial<T extends object> = PickNonNullable<T> extends T ? PickNonNullable<T> : never;
```

## ResetterKey

```ts
type ResetterKey<T> = PrefixedKey<T, 'reset'>;
```

## CheckerKey

```ts
type CheckerKey<T> = PrefixedKey<T, 'contains'>;
```

## Resetter

```ts
type Resetter = () => void;
```

## Checker

```ts
type Checker = () => boolean;
```

<Divider />

## PrefixedKey

```ts
type PrefixedKey<T, Prefix extends string> = T extends string ? `${Prefix}${Capitalize<T>}` : never;
```

## SuffixedKey

```ts
type SuffixedKey<T, Suffix extends string> = T extends string ? `${T}${Capitalize<Suffix>}` : never;
```

## RestorePrefixedKey

```ts
type RestorePrefixedKey<T, Prefix extends string> = T extends `${Prefix}${infer U}` ? Uncapitalize<U> : never;
```

## RestoreSuffixedKey

```ts
type RestoreSuffixedKey<T, Suffix extends string> = T extends `${infer U}${Capitalize<Suffix>}` ? U : never;
```

## PrefixedKeys

```ts
type PrefixedKeys<T, Prefix extends string> = PrefixedKey<keyof T, Prefix>;
```

## SuffixedKeys

```ts
type SuffixedKeys<T, Suffix extends string> = SuffixedKey<keyof T, Suffix>;
```

<Divider />

## IsOptional

```ts
type IsOptional<T extends object, K extends keyof T> = {
  [K1 in Exclude<keyof T, K>]: T[K1];
} & { K?: T[K] } extends T
  ? K
  : never;
```

## OptionalKeys

```ts
type OptionalKeys<T extends object> = {
  [K in keyof T]-?: IsOptional<T, K>;
}[keyof T];
```

## PickNonNullable

```ts
type PickNonNullable<T extends object> = Omit<T, OptionalKeys<T>>;
```
