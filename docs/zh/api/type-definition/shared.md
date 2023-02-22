# Shared 类型集

## Function

<CodeScroll>

```ts
export type Function<T, R> = (arg: T) => R;
```

</CodeScroll>

## BiFunction

<CodeScroll>

```ts
export type BiFunction<T extends Array<unknown>, R> = (...arg: T) => R;
```

</CodeScroll>

## Supplier

<CodeScroll>

```ts
export type Supplier<R> = () => R;
```

</CodeScroll>

## Runnable

<CodeScroll>

```ts
export type Runnable = () => void;
```

</CodeScroll>

## Consumer

<CodeScroll>

```ts
export type Consumer<T> = (arg: T) => void;
```

</CodeScroll>

## BiConsumer

<CodeScroll>

```ts
export type BiConsumer<T extends Array<unknown>> = (...arg: T) => void;
```

</CodeScroll>

<Divider />

## StorageModuleSchema

<CodeScroll>

```ts
type StorageModuleSchema = Record<string, unknown>;
```

</CodeScroll>

## ResetterKey

<CodeScroll>

```ts
type ResetterKey<T> = PrefixedKey<T, 'reset'>;
```

</CodeScroll>

## CheckerKey

<CodeScroll>

```ts
type CheckerKey<T> = PrefixedKey<T, 'contains'>;
```

</CodeScroll>

## Resetter

<CodeScroll>

```ts
type Resetter = () => void;
```

</CodeScroll>

## Checker

<CodeScroll>

```ts
type Checker = () => boolean;
```

</CodeScroll>

<Divider />

## PrefixedKey

<CodeScroll>

```ts
type PrefixedKey<T, Prefix extends string> = T extends string ? `${Prefix}${Capitalize<T>}` : never;
```

</CodeScroll>

## SuffixedKey

<CodeScroll>

```ts
type SuffixedKey<T, Suffix extends string> = T extends string ? `${T}${Capitalize<Suffix>}` : never;
```

</CodeScroll>

## RestorePrefixedKey

<CodeScroll>

```ts
type RestorePrefixedKey<T, Prefix extends string> = T extends `${Prefix}${infer U}` ? Uncapitalize<U> : never;
```

</CodeScroll>

## RestoreSuffixedKey

<CodeScroll>

```ts
type RestoreSuffixedKey<T, Suffix extends string> = T extends `${infer U}${Capitalize<Suffix>}` ? U : never;
```

</CodeScroll>

## PrefixedKeys

<CodeScroll>

```ts
type PrefixedKeys<T, Prefix extends string> = PrefixedKey<keyof T, Prefix>;
```

</CodeScroll>

## SuffixedKeys

<CodeScroll>

```ts
type SuffixedKeys<T, Suffix extends string> = SuffixedKey<keyof T, Suffix>;
```

</CodeScroll>

<Divider />

## IsOptional

<CodeScroll>

```ts
type IsOptional<T extends object, K extends keyof T> = {
  [K1 in Exclude<keyof T, K>]: T[K1];
} & { K?: T[K] } extends T
  ? K
  : never;
```

</CodeScroll>

## OptionalKeys

<CodeScroll>

```ts
type OptionalKeys<T extends object> = {
  [K in keyof T]-?: IsOptional<T, K>;
}[keyof T];
```

</CodeScroll>

## PickNonNullable

<CodeScroll>

```ts
type PickNonNullable<T extends object> = Omit<T, OptionalKeys<T>>;
```

</CodeScroll>
