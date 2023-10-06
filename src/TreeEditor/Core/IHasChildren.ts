import { Node } from 'TreeEditor/Core/Node'

export interface IHasChildren
{
  getChildren(): Node[]

  addChild(node: Node): void

  removeChild(node: Node): void
}