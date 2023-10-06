import { Scene } from 'three'

export declare interface ISceneEntity
{
  getId(): string

  getName(): string

  onStart(): void

  onUpdate(): void

  onEnable(scene: Scene): void
}