import { Node } from 'TreeEditor/Core/Node'
import { State } from 'TreeEditor/Core/State'
import { IHasChildren } from 'TreeEditor/Core/IHasChildren'

export class RootNode extends Node implements IHasChildren
{
  public static readonly Type: string = 'root'

  constructor(protected child: Node|null = null)
  {
    super();
  }

  public onStart(): void
  {
  }

  public onUpdate(): State
  {
    if (!this.child)
    {
      return State.Failure;
    }

    return this.child.onUpdate()
  }

  public onStop(): void
  {
  }

  public addChild(node: Node): void
  {
    this.child = node;
  }

  public removeChild(node: Node): void
  {
    this.child = null;
  }

  public getChildren(): Node[]
  {
    return (!this.child) ? [] : [ this.child ]
  }
}