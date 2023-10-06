import { Node, RootNode } from 'TreeEditor/Core'
import { INodeBuilder } from 'TreeEditor/Factory/Node/INodeBuilder'
import { FlumeNode } from 'flume'

export class RootBuilder implements INodeBuilder
{
  public supports(type: string): boolean
  {
    return type === 'root'
  }

  public build(node: FlumeNode): Node
  {
    const root = new RootNode()
    root.setGUID(node.id)

    return root
  }
}