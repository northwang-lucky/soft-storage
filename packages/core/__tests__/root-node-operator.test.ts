import { RootNodeOperator, StorageType } from '../src';

test('RootNodeOperator', () => {
  const origin = { key: 'test-value' };
  const rootNodeOperator = new RootNodeOperator('rootNodeOperatorTest', StorageType.SESSION);

  rootNodeOperator.setRootNode(origin);
  let rootNode = rootNodeOperator.getRootNode();
  expect(rootNode).toStrictEqual(origin);

  rootNode = rootNodeOperator.getRootNode();
  expect(rootNode).toStrictEqual(origin);

  rootNodeOperator.removeRootNode();
  rootNode = rootNodeOperator.getRootNode();
  expect(rootNode).toStrictEqual({});
});
