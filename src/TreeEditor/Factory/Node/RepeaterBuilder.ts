import { Context, Node } from 'TreeEditor/Core'
import { INodeBuilder } from 'TreeEditor/Factory/Node/INodeBuilder'
import { Repeater } from 'TreeEditor/Core/Decorators'
import { FlumeNode } from 'flume'

export class RepeaterBuilder implements INodeBuilder
{
  public supports(type: string, context: Context): boolean
  {
    return type === 'repeater'
  }

  public build(node: FlumeNode, context: Context): Node
  {
    const repeater = new Repeater()
    repeater.setGUID(node.id)

    return repeater
  }
}