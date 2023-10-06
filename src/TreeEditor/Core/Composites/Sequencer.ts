import { CompositeNode } from 'TreeEditor/Core/CompositeNode'
import { State } from 'TreeEditor/Core/State'
import Description from 'TreeEditor/Core/Metadata/Description'

@Description('Create a behaviour sequence')
export class Sequencer extends CompositeNode
{
  protected current: number = 0

  public onStart(): void
  {
    this.current = 0
  }

  public onUpdate(): State
  {
    for (let i = 0; i < this.children.length; i++) {
      this.current = i
      const child = this.children[this.current]

      switch (child.update())
      {
        case State.Running:
          return State.Running
        case State.Failure:
          return State.Failure
        case State.Success:
          continue;
      }
    }

    return State.Success
  }

  public onStop(): void
  {
  }
}