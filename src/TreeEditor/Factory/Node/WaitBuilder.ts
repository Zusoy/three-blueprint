import { Context, Node } from 'TreeEditor/Core'
import { Wait } from 'TreeEditor/Core/Actions'
import { INodeBuilder } from 'TreeEditor/Factory/Node/INodeBuilder'
import { FlumeNode } from 'flume'

export class WaitBuilder implements INodeBuilder
{
  public supports(type: string, context: Context): boolean
  {
    return type === 'wait'
  }

  public build(node: FlumeNode, context: Context): Node
  {
    const wait = new Wait(node.inputData.duration.number)
    wait.setGUID(node.id)

    return wait
  }
}