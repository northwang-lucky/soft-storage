import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { createLocalStorage, createSessionStorage, SoftStorage, useStorage, useStorageHelper } from '../src';

type TestStorage = {
  str?: string;
  num?: number;
  bool: boolean;
};

const localStorage = createLocalStorage<TestStorage>({
  storageModuleKey: 'createLocalStorageTest',
  initial: { bool: true },
});

const sessionStorage = createSessionStorage<TestStorage>({
  storageModuleKey: 'createSessionStorageTest',
  initial: { bool: true },
});

const protectStorage = createSessionStorage<TestStorage>({
  storageModuleKey: 'createProtectStorageTest',
  protect: true,
  initial: { bool: true },
});

const getStorage = (protect: boolean, type: 'local' | 'session'): SoftStorage<TestStorage> => {
  let softStorage: SoftStorage<TestStorage>;
  if (protect) {
    softStorage = protectStorage;
  } else if (type === 'local') {
    softStorage = localStorage;
  } else {
    softStorage = sessionStorage;
  }
  return softStorage;
};

function App(props: { type: 'local' | 'session'; protect: boolean }): JSX.Element {
  const { type, protect } = props;

  const {
    strState: { str, setStr, containsStr },
    numState: { num, setNum, resetNum },
    boolState: { bool, setBool, resetBool },
  } = useStorage(getStorage(protect, type));
  const storageHelper = useStorageHelper(getStorage(protect, type));

  return (
    <>
      <span data-testid="str">{str}</span>
      <span data-testid="str-exist">{containsStr().toString()}</span>
      <button data-testid="str-set" type="button" onClick={() => setStr('string')}>
        Set str to &apos;string&apos;
      </button>

      <span data-testid="num">{num}</span>
      <button data-testid="num-set" type="button" onClick={() => setNum(1)}>
        Set num to 1
      </button>
      <button data-testid="num-reset" type="button" onClick={() => resetNum()}>
        Reset num
      </button>

      <span data-testid="bool">{bool.toString()}</span>
      <button data-testid="bool-set" type="button" onClick={() => setBool(() => false)}>
        Set bool to false
      </button>
      <button data-testid="bool-reset" type="button" onClick={() => resetBool()}>
        Reset bool
      </button>

      <span data-testid="num-contains">{storageHelper.contains('num').toString()}</span>
      <span data-testid="size">{storageHelper.size()}</span>
      <button data-testid="initialize" type="button" onClick={() => storageHelper.initialize()}>
        Initialize
      </button>
    </>
  );
}

function useTestCase(type: 'local' | 'session', protect = false): void {
  // @ts-ignore
  render(<App type={type} protect={protect} />);

  fireEvent.click(screen.getByTestId('str-set'));
  expect(screen.getByTestId('str').textContent).toBe('string');
  expect(screen.getByTestId('str-exist').textContent).toBe('true');

  expect(screen.getByTestId('num-contains').textContent).toBe('false');
  expect(screen.getByTestId('size').textContent).toBe('2');

  fireEvent.click(screen.getByTestId('num-set'));
  expect(screen.getByTestId('num').textContent).toBe('1');
  expect(screen.getByTestId('size').textContent).toBe('3');

  expect(screen.getByTestId('bool').textContent).toBe('true');
  fireEvent.click(screen.getByTestId('bool-reset'));
  expect(screen.getByTestId('bool').textContent).toBe('true');
  expect(screen.getByTestId('size').textContent).toBe('3');

  fireEvent.click(screen.getByTestId('num-reset'));
  expect(screen.getByTestId('size').textContent).toBe('2');
  expect(screen.getByTestId('num').textContent).toBe('');

  fireEvent.click(screen.getByTestId('initialize'));
  expect(screen.getByTestId('size').textContent).toBe('1');

  if (protect) {
    let windowStorage: Storage;
    if (type === 'local') {
      windowStorage = window.localStorage;
    } else {
      windowStorage = window.sessionStorage;
    }

    try {
      windowStorage.setItem('createProtectStorageTest', '123');
    } catch (err: any) {
      const message = `Direct calls for setItem to "createProtectStorageTest" are disabled! Do not use the 'protect' property if this is not your preference.`;
      expect(err.message).toBe(message);
    }

    try {
      windowStorage.removeItem('createProtectStorageTest');
    } catch (err: any) {
      const message = `Direct calls for removeItem to "createProtectStorageTest" are disabled! Do not use the 'protect' property if this is not your preference.`;
      expect(err.message).toBe(message);
    }

    expect(screen.getByTestId('bool').textContent).toBe('true');

    fireEvent.click(screen.getByTestId('bool-set'));
    expect(screen.getByTestId('bool').textContent).toBe('false');
  }
}

test('createLocalStorage', () => {
  useTestCase('local');
});

test('createSessionStorage', () => {
  useTestCase('session');
});

test('createProtectStorage', () => {
  useTestCase('session', true);
});
