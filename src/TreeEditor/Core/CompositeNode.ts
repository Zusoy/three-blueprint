import { Node } from 'TreeEditor/Core/Node'
import { IHasChildren } from 'TreeEditor/Core/IHasChildren'

export abstract class CompositeNode extends Node implements IHasChildren
{
  constructor(protected children: Node[] = [])
  {
    super();
  }

  public addChild(node: Node): void
  {
    this.children = [ ...this.children, node ]
  }

  public removeChild(node: Node): void
  {
    this.children = this.children.filter(child => child.getGUID() !== node.getGUID());
  }

  public getChildren(): Node[]
  {
    return this.children;
  }
}