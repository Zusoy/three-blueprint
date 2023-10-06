import { Node, Context } from 'TreeEditor/Core'
import { FlumeNode } from 'flume'

export interface INodeBuilder
{
  supports(type: string, context: Context): boolean

  build(node: FlumeNode, context: Context): Node
}