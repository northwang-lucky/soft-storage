---
extractApiHeaders: [2]
---

# Shared API

## createProxy()

Create a `Proxy` instance.

### Type

```ts
function createProxy<T extends object = object, R = T>(target: T, handler: ProxyHandler<T>): R;
```

### Parameters

- `target: T`

  The target object to be brokered.

- `handler: ProxyHandler<T>`

  Same as handler for `Proxy` 👉🏻 [Handler functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy#handler_functions)

### Return Value

Proxy-wrapped object.

### Example

```ts
type Greeter = {
  hello(): void;
}

const proxy = createProxy<object, Greeter>({}, {
  get(_, property) {
    if (property === 'hello') {
      return () => void console.log('hello');
    }
    return undefined;
  }
});

proxy.hello(); // Output: hello
```

## restorePrefixedKey()

Restore a prefixed key.

### Type

```ts
function restorePrefixedKey(prefixedKey: string, prefix: string, uncapitalize?: boolean): string;
```

### Parameters

- `prefixedKey: string`

  Prefixed key.

- `prefix: string`

  Prefix string.

- `uncapitalize?: boolean = true`

  Whether to automatically change the first letter of the restored string to lower case.

### Return Value

Restored string.

### Example

```ts
const prefixedKey = 'setToken';
const key = restorePrefixedKey(prefixedKey, 'set'); // key = 'token'
```

## restoreSuffixedKey()

Restore a suffixed key.

### Type

```ts
function restoreSuffixedKey(suffixedKey: string, suffix: string, autoCapitalizeSuffix?: boolean): string;
```

### Parameters

- `suffixedKey: string`

  Suffixed key.

- `suffix: string`

  Suffixed string.

- `autoCapitalizeSuffix?: boolean = true`

  Whether to automatically capitalize the first letter of the suffix string.

### Return Value

Restored string.

### Example

```ts
const suffixedKey = 'tokenState';
const key = restoreSuffixedKey(suffixedKey, 'state'); // key = 'token'
```
