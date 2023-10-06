import { GameObject } from 'Game'
import { Context, Node } from 'TreeEditor/Core'
import { Rotate } from 'TreeEditor/Core/Actions'
import { INodeBuilder } from 'TreeEditor/Factory/Node/INodeBuilder'
import { FlumeNode } from 'flume'

export class RotateBuilder implements INodeBuilder
{
  public supports(type: string, context: Context): boolean
  {
    return type === 'rotate'
  }

  public build(node: FlumeNode, context: Context): Node
  {
    const id: string = node.inputData.target.gameObject
    const target: GameObject = context.scene.entities.find(entity => entity.getId() === id) as GameObject
    const rotate = new Rotate(target, node.inputData.y.number)
    rotate.setGUID(node.id)

    return rotate
  }
}