import { DecoratorNode } from 'TreeEditor/Core/DecoratorNode'
import { State } from 'TreeEditor/Core/State'
import Description from 'TreeEditor/Core/Metadata/Description'

@Description('Repeat the child node')
export class Repeater extends DecoratorNode
{
  public onStart(): void
  {
  }

  public onUpdate(): State
  {
    if (!this.child)
    {
      return State.Failure;
    }

    switch (this.child.update())
    {
      case State.Running:
        break;
      case State.Success:
        break;
      case State.Failure:
        return State.Failure
    }

    return State.Running;
  }

  public onStop(): void
  {
  }
}