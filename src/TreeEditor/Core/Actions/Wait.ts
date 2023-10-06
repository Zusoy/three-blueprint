import { ActionNode } from 'TreeEditor/Core/ActionNode'
import { State } from 'TreeEditor/Core/State'
import InputControl from 'TreeEditor/Core/Metadata/InputControl'
import Description from 'TreeEditor/Core/Metadata/Description'

@Description('Wait a given time')
export class Wait extends ActionNode
{
  @InputControl({ name: 'wait_time', label: 'Wait Time (s)', type: 'number' })
  public readonly waitTime: number
  private waited: boolean = false

  constructor(waitTime: number)
  {
    super()
    this.waitTime = waitTime
  }

  public onStart(): void
  {
    this.wait()
  }

  public onUpdate(): State
  {
    if (this.waited)
    {
      this.waited = false
      this.wait()

      return State.Success
    }

    return State.Running
  }

  public onStop(): void
  {
  }

  private wait(): void
  {
    (new Promise<boolean>((resolver) => {
      setTimeout(() => {
        resolver(true)
      }, this.waitTime)
    })).then(() => this.waited = true);
  }
}