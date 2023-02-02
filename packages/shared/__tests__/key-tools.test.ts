import { restorePrefixedKey, restoreSuffixedKey } from '../src';

test('restorePrefixedKey', () => {
  let key = restorePrefixedKey('resetStr', 'reset');
  expect(key).toBe('str');
  key = restorePrefixedKey('resetStr', 'reset', false);
  expect(key).toBe('Str');
});

test('restoreSuffixedKey', () => {
  let key = restoreSuffixedKey('strState', 'state');
  expect(key).toBe('str');
  key = restoreSuffixedKey('strState', 'State', false);
  expect(key).toBe('str');
});
