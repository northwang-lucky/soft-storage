import { render, fireEvent, screen } from '@testing-library/vue';
import { defineComponent, PropType } from 'vue';
import { createLocalStorage, createSessionStorage, SoftStorage, useStorage, useStorageHelper } from '../src';

type TestStorage = {
  str?: string;
  num?: number;
  bool: boolean;
  arr: {
    name: string;
    age: number;
  }[];
};

const localStorage = createLocalStorage<TestStorage>({
  storageModuleKey: 'createLocalStorageTest',
  initial: { bool: true, arr: [] },
});

const sessionStorage = createSessionStorage<TestStorage>({
  storageModuleKey: 'createSessionStorageTest',
  initial: { bool: true, arr: [] },
});

const protectStorage = createSessionStorage<TestStorage>({
  storageModuleKey: 'createProtectStorageTest',
  protect: true,
  initial: { bool: true, arr: [] },
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

const App = defineComponent({
  name: 'App',
  template: /* html */ `
    <span data-testid="str">{{ str }}</span>
    <span data-testid="str-exist">{{ containsStr().toString() }}</span>
    <button data-testid="str-set" type="button" @click="str = 'string'">Set str to &apos;string&apos;</button>

    <span data-testid="num">{{ num }}</span>
    <button data-testid="num-set" type="button" @click="num = 1">Set num to 1</button>
    <button data-testid="num-reset" type="button" @click="resetNum">Reset num</button>

    <span data-testid="bool">{{ bool.toString() }}</span>
    <button data-testid="bool-set" type="button" @click="bool = false">Set bool to false</button>
    <button data-testid="bool-reset" type="button" @click="resetBool">Reset bool</button>

    <span data-testid="num-contains">{{ storageHelper.contains('num').toString() }}</span>
    <span data-testid="size">{{ storageHelper.size() }}</span>
    <button data-testid="initialize" type="button" @click="storageHelper.initialize">Initialize</button>

    <span data-testid="arr">{{ JSON.stringify(arr) }}</span>
    <button data-testid="arr-push" @click="handleArrPush">Push</button>
    <button data-testid="arr-reset" @click="resetArr">Reset Arr</button>
    <button data-testid="arr-delete" @click="handleArrDelete">Delete Item</button>
  `,
  props: {
    type: {
      type: String as PropType<'local' | 'session'>,
      required: true,
    },
    protect: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    const {
      refs: { str, num, bool, arr },
      resetters: { resetNum, resetBool, resetArr },
      checkers: { containsStr },
    } = useStorage(getStorage(props.protect, props.type));
    const storageHelper = useStorageHelper(getStorage(props.protect, props.type));

    const handleArrPush = (): void => {
      arr.value.push({ name: 'sakura', age: 18 });
    };

    const handleArrDelete = (): void => {
      delete arr.value[0];
    };

    return {
      str,
      num,
      bool,
      arr,
      resetNum,
      resetBool,
      resetArr,
      containsStr,
      storageHelper,
      handleArrPush,
      handleArrDelete,
    };
  },
});

async function useTestCase(type: 'local' | 'session', protect = false): Promise<void> {
  render(App, { props: { type, protect } });

  await fireEvent.click(screen.getByTestId('str-set'));
  expect(screen.getByTestId('str').textContent).toBe('string');
  expect(screen.getByTestId('str-exist').textContent).toBe('true');

  expect(screen.getByTestId('num-contains').textContent).toBe('false');
  expect(screen.getByTestId('size').textContent).toBe('3');

  await fireEvent.click(screen.getByTestId('num-set'));
  expect(screen.getByTestId('num').textContent).toBe('1');
  expect(screen.getByTestId('size').textContent).toBe('4');

  expect(screen.getByTestId('bool').textContent).toBe('true');
  await fireEvent.click(screen.getByTestId('bool-reset'));
  expect(screen.getByTestId('bool').textContent).toBe('true');
  expect(screen.getByTestId('size').textContent).toBe('4');

  await fireEvent.click(screen.getByTestId('num-reset'));
  expect(screen.getByTestId('size').textContent).toBe('3');
  expect(screen.getByTestId('num').textContent).toBe('');

  await fireEvent.click(screen.getByTestId('initialize'));
  expect(screen.getByTestId('size').textContent).toBe('2');

  await fireEvent.click(screen.getByTestId('arr-push'));
  let arrValue = JSON.parse(screen.getByTestId('arr').textContent ?? '[]');
  expect(arrValue).toStrictEqual([{ name: 'sakura', age: 18 }]);

  await fireEvent.click(screen.getByTestId('arr-delete'));
  arrValue = JSON.parse(screen.getByTestId('arr').textContent ?? '[]');
  expect(arrValue).toStrictEqual([null]);

  await fireEvent.click(screen.getByTestId('arr-reset'));
  arrValue = JSON.parse(screen.getByTestId('arr').textContent ?? '[]');
  expect(arrValue).toStrictEqual([]);

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

    expect((await screen.findByTestId('bool')).textContent).toBe('true');
    await fireEvent.click(screen.getByTestId('bool-set'));
    expect((await screen.findByTestId('bool')).textContent).toBe('false');
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
