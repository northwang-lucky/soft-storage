export function createProxy<T extends object = object, R = T>(target: T, handler: ProxyHandler<T>): R {
  return new Proxy(target, handler) as unknown as R;
}
