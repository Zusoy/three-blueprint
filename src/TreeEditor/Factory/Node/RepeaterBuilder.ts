import { Node } from 'TreeEditor/Core'
import { INodeBuilder } from 'TreeEditor/Factory/Node/INodeBuilder'
import { Repeater } from 'TreeEditor/Core/Decorators'
import { FlumeNode } from 'flume'

export class RepeaterBuilder implements INodeBuilder
{
  public supports(type: string): boolean
  {
    return type === 'repeater'
  }

  public build(node: FlumeNode): Node
  {
    const repeater = new Repeater()
    repeater.setGUID(node.id)

    return repeater
  }
}