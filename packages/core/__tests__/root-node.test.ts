import { RootNode, StorageType } from '../src';
import { rootNodePool } from '../src/root-node-pool';

interface TestStorage {
  num: number;
  str: string;
}

function testRootNode(storageType: StorageType) {
  const rootNode = new RootNode<TestStorage>('rootNodeTest', storageType);

  rootNode.setItem('num', 1);
  let numValue = rootNode.getItem('num');
  expect(numValue).toBe(1);

  let exist = rootNode.contains('num');
  expect(exist).toBe(true);

  exist = rootNode.contains('str');
  expect(exist).toBe(false);

  expect(rootNode.size()).toBe(1);

  rootNode.removeItem('num');
  numValue = rootNode.getItem('num');
  expect(numValue).toBe(undefined);

  rootNode.setItem('num', 1);
  rootNode.setItem('str', 'string');
  rootNode.removeItem('str');
  const strValue = rootNode.getItem('str');
  expect(strValue).toBe(undefined);

  const helper = rootNode.getHelper();
  const rootValue = helper.getRootValue();
  expect(rootValue).toStrictEqual({ num: 1 });
}

test('RootNodeLocal', () => {
  testRootNode(StorageType.LOCAL);
});
test('RootNodeSession', () => {
  testRootNode(StorageType.SESSION);
});

test('ConflictCheckLocal', () => {
  const rootNode = new RootNode<TestStorage>('conflictCheckLocalTest', StorageType.LOCAL);
  rootNode.getHelper().setRootValue({ num: 1, str: '2' });

  try {
    const anotherRootNode = new RootNode<TestStorage>('conflictCheckLocalTest', StorageType.LOCAL);
    anotherRootNode.getHelper().setRootValue({ num: 1, str: '2' });
  } catch (err: any) {
    expect(err.message).toBe("Root node key 'conflictCheckLocalTest' is already existed!");
  }
});

test('ConflictCheckSession', () => {
  const rootNode = new RootNode<TestStorage>('conflictCheckSessionTest', StorageType.SESSION);
  rootNode.getHelper().setRootValue({ num: 1, str: '2' });

  try {
    const anotherRootNode = new RootNode<TestStorage>('conflictCheckSessionTest', StorageType.SESSION);
    anotherRootNode.getHelper().setRootValue({ num: 1, str: '2' });
  } catch (err: any) {
    expect(err.message).toBe("Root node key 'conflictCheckSessionTest' is already existed!");
  }
});

test('NoPoolRootNode', () => {
  const rootNode = new RootNode('noPoolRootNodeTest', StorageType.SESSION, true);
  const contains = rootNodePool.contains(rootNode);
  expect(contains).toBe(false);
});
