import { NodeItemOperator, StorageType } from '../src';

interface TestStorage {
  num: number;
  str: string;
}

test('NodeItemOperator', () => {
  const nodeItemOperator = new NodeItemOperator<TestStorage>('nodeItemOperatorTest', StorageType.LOCAL);

  nodeItemOperator.setItem('num', 1);
  let numValue = nodeItemOperator.getItem('num');
  expect(numValue).toBe(1);

  let exist = nodeItemOperator.contains('num');
  expect(exist).toBe(true);

  exist = nodeItemOperator.contains('str');
  expect(exist).toBe(false);

  expect(nodeItemOperator.size).toBe(1);

  nodeItemOperator.removeItem('num');
  numValue = nodeItemOperator.getItem('num');
  expect(numValue).toBe(null);

  nodeItemOperator.setItem('num', 1);
  nodeItemOperator.setItem('str', 'string');
  nodeItemOperator.removeItem('str');
  const strValue = nodeItemOperator.getItem('str');
  expect(strValue).toBe(null);

  const rootNodeOperator = nodeItemOperator.getRootNodeOperator();
  const rootNode = rootNodeOperator.getRootNode();
  expect(rootNode).toStrictEqual({ num: 1 });
});
