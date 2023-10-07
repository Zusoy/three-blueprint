import { Context, Node, RootNode, Tree } from 'TreeEditor/Core'
import { FlumeNode, NodeMap } from 'flume'
import { INodeBuilder } from 'TreeEditor/Factory/Node/INodeBuilder'

export class TreeFactory
{
  constructor(private readonly nodeBuilder: INodeBuilder, private readonly context: Context)
  {
  }

  public buildFromFlumeMap(map: NodeMap): Tree
  {
    const flumeRoot = Object.values(map).find(node => node.root)

    if (!flumeRoot || !flumeRoot.connections.outputs?.node) {
      return Tree.Empty()
    }

    const buildTree = (flumeNode: FlumeNode, map: NodeMap, tree: Tree) => {
      if (!tree.findNode(flumeNode.id)) {
        const newNode = this.nodeBuilder.build(flumeNode, this.context)
        tree.addNode(newNode)
      }

      const currentNode = tree.findNode(flumeNode.id) as Node

      const inputs = flumeNode.connections.inputs.node
      const nodeParentInputs = inputs?.map(connection => tree.findNode(connection.nodeId)) || []

      nodeParentInputs.forEach(parent => {
        if (!!parent) {
          tree.addChild(parent.getGUID(), currentNode)
        }
      })

      const outputs = flumeNode.connections.outputs.node
      const flumeOutputs = outputs?.map(o => this.findInMap(o.nodeId, map)) || []

      flumeOutputs.forEach(output => {
        if (!!output) {
          buildTree(output, map, tree)
        }
      })
    }

    const tree = Tree.Empty()
    buildTree(flumeRoot, map, tree)

    const root = tree.nodes.find(node => node instanceof RootNode)
    tree.defineRoot(root as RootNode)

    return tree
  }

  private findInMap(nodeId: string, map: NodeMap): FlumeNode|null
  {
    const node = Object.values(map).find(node => node.id === nodeId)

    return node ?? null
  }
}