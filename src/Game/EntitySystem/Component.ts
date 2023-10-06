import { GameObject } from 'Game/EntitySystem/GameObject'

export abstract class Component
{
  constructor(protected readonly gameObject: GameObject)
  {
  }

  abstract start(): void

  abstract update(): void
}