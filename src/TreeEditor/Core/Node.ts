import { State } from 'TreeEditor/Core/State'
import { Context } from 'TreeEditor/Core/Context'

export abstract class Node
{
  protected guid: string = ''
  protected state: State = State.Running
  protected started: boolean = false
  protected context: Context|null = null

  constructor()
  {
  }

  public setGUID(guid: string)
  {
    this.guid = guid
  }

  public getGUID()
  {
    return this.guid
  }

  public update(): State
  {
    if (!this.started) {
      this.started = true;
      this.onStart();
    }

    this.state = this.onUpdate();

    if (this.state !== State.Running) {
      this.onStop();
      return this.state;
    }

    return State.Running;
  }

  public bind(context: Context): void
  {
    this.context = context
  }

  abstract onStart(): void;
  abstract onUpdate(): State;
  abstract onStop(): void;
}