import { Node } from 'TreeEditor/Core/Node'
import { IHasChildren } from 'TreeEditor/Core/IHasChildren';

export abstract class DecoratorNode extends Node implements IHasChildren
{
  constructor(protected child: Node|null = null)
  {
    super();
  }

  public addChild(node: Node): void
  {
    this.child = node
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