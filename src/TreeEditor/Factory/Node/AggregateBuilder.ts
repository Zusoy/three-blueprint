import { Context, Node } from 'TreeEditor/Core'
import { INodeBuilder } from 'TreeEditor/Factory/Node/INodeBuilder'
import { FlumeNode } from 'flume'

export class AggregateBuilder implements INodeBuilder
{
  constructor(private readonly builders: INodeBuilder[])
  {
  }

  public supports(type: string, context: Context): boolean
  {
    return true
  }

  public build(node: FlumeNode, context: Context): Node
  {
    const builder = this.builders.find(builder => builder.supports(node.type, context))

    if (!builder) {
      throw new Error(`Node builder not found for type ${ node.type }`)
    }

    return builder.build(node, context)
  }
}