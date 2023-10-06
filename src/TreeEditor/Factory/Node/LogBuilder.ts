import { FlumeNode } from "flume";
import { Context, Node } from 'TreeEditor/Core'
import { Log } from "TreeEditor/Core/Actions";
import { INodeBuilder } from 'TreeEditor/Factory/Node/INodeBuilder'

export class LogBuilder implements INodeBuilder
{
  public supports(type: string, context: Context): boolean
  {
    return type === 'log'
  }

  public build(node: FlumeNode, context: Context): Node
  {
    const log = new Log(node.inputData.message.string)
    log.setGUID(node.id)

    return log
  }
}