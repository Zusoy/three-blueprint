import { Node } from 'TreeEditor/Core'
import { Wait } from 'TreeEditor/Core/Actions'
import { INodeBuilder } from 'TreeEditor/Factory/Node/INodeBuilder'
import { FlumeNode } from 'flume'

export class WaitBuilder implements INodeBuilder
{
  public supports(type: string): boolean
  {
    return type === 'wait'
  }

  public build(node: FlumeNode): Node
  {
    const wait = new Wait(node.inputData.wait_time.number)
    wait.setGUID(node.id)

    return wait
  }
}