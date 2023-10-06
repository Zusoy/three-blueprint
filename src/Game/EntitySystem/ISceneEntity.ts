import { Scene } from 'three'

export declare interface ISceneEntity
{
  onStart(): void

  onUpdate(): void

  onEnable(scene: Scene): void
}