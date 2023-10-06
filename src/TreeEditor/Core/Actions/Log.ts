import { ActionNode } from 'TreeEditor/Core/ActionNode'
import { State } from 'TreeEditor/Core/State'
import InputControl from 'TreeEditor/Core/Metadata/InputControl'
import Description from 'TreeEditor/Core/Metadata/Description'

@Description('Display message in console')
export class Log extends ActionNode
{
  @InputControl({ type: 'string', label: 'Message', name: 'message' })
  public readonly message: string

  constructor(message: string)
  {
    super()
    this.message = message
  }

  public onStart(): void
  {
    console.log(`[START] On Start : ${ this.message }`)
  }

  public onUpdate(): State
  {
    console.log(`[UPDATE] On Update : ${ this.message }`)

    return State.Success
  }

  public onStop(): void
  {
    console.log(`[STOP] On Stop : ${ this.message }`)
  }
}