import { ActionNode, State } from 'TreeEditor/Core'
import { GameObject } from 'Game'
import GameObjectRef from 'TreeEditor/Core/Metadata/GameObjectReference'
import InputControl from 'TreeEditor/Core/Metadata/InputControl'

export class Rotate extends ActionNode
{
  @GameObjectRef({ name: 'target', label: 'Target' })
  private readonly target: GameObject

  @InputControl({ name: 'y', label: 'Y rotation', type: 'number' })
  private readonly yRotation: number

  constructor(target: GameObject, yRotation: number)
  {
    super()
    this.target = target
    this.yRotation = yRotation
  }

  public onStart(): void
  {
  }

  public onUpdate(): State
  {
    this.target.rotation.y += this.yRotation

    return State.Success
  }

  public onStop(): void
  {
  }
}