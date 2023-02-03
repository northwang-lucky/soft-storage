import { RootNode, StorageType } from '@smart-storage/core';

export function processVersion<T extends object>(
  rootNodeKey: string,
  storageType: StorageType,
  version: number,
  preVersion = version - 1
) {
  if (version < 1) {
    throw new Error("The minimum value of property 'version' is 1!");
  }

  if (typeof preVersion === 'number' && preVersion >= version) {
    throw new Error("Property 'preVersion' must be less than property 'version'!");
  }

  if (version === 1) {
    return new RootNode<T>(rootNodeKey, storageType);
  }

  // Remove preRootNodeKey and its value
  const preRootNodeKey = preVersion > 1 ? `${rootNodeKey}_v${preVersion}` : rootNodeKey;
  const preRootNode = new RootNode(preRootNodeKey, storageType, true);
  if (preRootNode.getHelper().getExistence()) {
    preRootNode.clear();
  }

  // Return current version's RootNode
  return new RootNode<T>(`${rootNodeKey}_v${version}`, storageType);
}
