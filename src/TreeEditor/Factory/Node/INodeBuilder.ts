import { Node } from 'TreeEditor/Core'
import { FlumeNode } from 'flume'

export interface INodeBuilder
{
  supports(type: string): boolean

  build(node: FlumeNode): Node
}