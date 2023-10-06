import { State } from 'TreeEditor/Core/State'

export abstract class Node
{
  protected guid: string = ''
  protected state: State = State.Running
  protected started: boolean = false

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

  abstract onStart(): void;
  abstract onUpdate(): State;
  abstract onStop(): void;
}