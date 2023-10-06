import { RootNode } from 'TreeEditor/Core/RootNode'
import { State } from 'TreeEditor/Core/State'
import { Node, Context } from 'TreeEditor/Core'
import { IHasChildren } from 'TreeEditor/Core/IHasChildren'

declare type TreeVisiter = (node: Node) => void

export class Tree
{
  protected state: State = State.Running
  public readonly nodes: Node[] = []

  public static Empty(): Tree
  {
    return new Tree(new RootNode(null))
  }

  constructor(protected rootNode: RootNode)
  {
  }

  public defineRoot(node: RootNode)
  {
    this.rootNode = node
  }

  public addNode(node: Node): void
  {
    this.nodes.push(node)
  }

  public addChild(parentGuid: string, child: Node): void
  {
    const parent = this.findNode(parentGuid)

    if (this.isParentNode(parent)) {
      parent.addChild(child)
    }
  }

  public update(): State
  {
    if (this.state === State.Running)
    {
      this.state = this.rootNode.update();
    }

    return this.state
  }

  private isParentNode(node: any): node is IHasChildren
  {
    return node && node.addChild && typeof(node.addChild) === 'function' &&
      node.getChildren && typeof(node.getChildren) === 'function'
  }

  public findNode(guid: string): Node|null
  {
    return this.nodes.find(node => node.getGUID() === guid) || null
  }

  public bind(context: Context): void
  {
    this.traverse(node => node.bind(context))
  }

  public traverse(visiter: TreeVisiter): void
  {
    this.nodes.forEach(node => visiter(node))
  }
}