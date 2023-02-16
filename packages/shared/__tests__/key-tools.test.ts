import { restorePrefixedString, restoreSuffixedString } from '../src';

test('restorePrefixedString', () => {
  let key = restorePrefixedString('resetStr', 'reset');
  expect(key).toBe('str');
  key = restorePrefixedString('resetStr', 'reset', false);
  expect(key).toBe('Str');
});

test('restoreSuffixedString', () => {
  let key = restoreSuffixedString('strState', 'state');
  expect(key).toBe('str');
  key = restoreSuffixedString('strState', 'State', false);
  expect(key).toBe('str');
});
