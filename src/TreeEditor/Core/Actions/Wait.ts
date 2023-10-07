import { ActionNode } from 'TreeEditor/Core/ActionNode'
import { State } from 'TreeEditor/Core/State'
import InputControl from 'TreeEditor/Core/Metadata/InputControl'
import Description from 'TreeEditor/Core/Metadata/Description'

@Description('Wait a given time')
export class Wait extends ActionNode
{
  @InputControl({ name: 'duration', label: 'Wait Time (s)', type: 'number' })
  public readonly duration: number
  private startTime: number|null = null

  constructor(duration: number)
  {
    super()
    this.duration = duration
  }

  public onStart(): void
  {
    this.startTime = this.context!.game.clock.getElapsedTime()
  }

  public onUpdate(): State
  {
    const timeRemaining = this.context!.game.clock.getElapsedTime() - (this.startTime as number)

    if (timeRemaining > this.duration) {
      return State.Success
    }

    return State.Running
  }

  public onStop(): void
  {
  }
}