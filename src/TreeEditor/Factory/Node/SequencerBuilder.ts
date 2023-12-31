import { Context, Node } from 'TreeEditor/Core'
import { INodeBuilder } from 'TreeEditor/Factory/Node/INodeBuilder'
import { FlumeNode } from 'flume'
import { Sequencer } from 'TreeEditor/Core/Composites'

export class SequencerBuilder implements INodeBuilder
{
  public supports(type: string, context: Context): boolean
  {
    return type === 'sequencer'
  }

  public build(node: FlumeNode, context: Context): Node
  {
    const sequencer = new Sequencer()
    sequencer.setGUID(node.id)

    return sequencer
  }
}