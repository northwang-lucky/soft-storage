import { StorageType } from '../root-node-helper/types';
import { IRootNode } from '../root-node/types';

class RootNodePool {
  private rootNodesLocal: IRootNode<object>[];

  private rootNodesSession: IRootNode<object>[];

  constructor() {
    this.rootNodesLocal = [];
    this.rootNodesSession = [];
  }

  public addRootNode(rootNode: IRootNode<object>) {
    const rootNodes = this.getRootNodes(rootNode);
    const argRootNodeKey = rootNode.getHelper().getStorageKey();
    const exist = rootNodes.some(node => node.getHelper().getStorageKey() === argRootNodeKey);
    if (exist) {
      throw new Error(`Root node key '${argRootNodeKey}' is already existed!`);
    }
    rootNodes.push(rootNode);
  }

  public removeRootNode(rootNode: IRootNode<object>) {
    const rootNodes = this.getRootNodes(rootNode);
    const rootNodeKey = rootNode.getHelper().getStorageKey();
    for (let i = 0; i < rootNodes.length; ++i) {
      if (rootNodes[i].getHelper().getStorageKey() === rootNodeKey) {
        rootNodes.splice(i, 1);
        break;
      }
    }
  }

  public contains(rootNode: IRootNode<object>): boolean {
    const rootNodes = this.getRootNodes(rootNode);
    const rootNodeKey = rootNode.getHelper().getStorageKey();
    return rootNodes.some(node => node.getHelper().getStorageKey() === rootNodeKey);
  }

  private getRootNodes(rootNode: IRootNode<object>) {
    let rootNodes: IRootNode<object>[];
    if (rootNode.getHelper().getStorageType() === StorageType.LOCAL) {
      rootNodes = this.rootNodesLocal;
    } else {
      rootNodes = this.rootNodesSession;
    }
    return rootNodes;
  }
}

export const rootNodePool = new RootNodePool();
