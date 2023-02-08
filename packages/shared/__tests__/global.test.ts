import { createProxy } from '../src';

test('createProxy', () => {
  const proxy = createProxy({ str: '123' }, { get: (target, p, receiver) => Reflect.get(target, p, receiver) });
  expect(proxy.str).toBe('123');
});
