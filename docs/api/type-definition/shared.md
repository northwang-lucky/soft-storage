# Shared Types

## PrefixedKey

```ts
type PrefixedKey<T, Prefix extends string> = T extends string ? `${Prefix}${Capitalize<T>}` : never;
```

## SuffixedKey

```ts
type SuffixedKey<T, Suffix extends string> = T extends string ? `${T}${Capitalize<Suffix>}` : never;
```

## PrefixedKeys

```ts
type PrefixedKeys<T, Prefix extends string> = PrefixedKey<keyof T, Prefix>;
```

## SuffixedKeys

```ts
type SuffixedKeys<T, Suffix extends string> = SuffixedKey<keyof T, Suffix>;
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
