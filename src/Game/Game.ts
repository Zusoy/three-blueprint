import { Renderer, Camera } from 'three'
import { Scene } from 'Game/Scene'

export class Game
{
  constructor(
    public readonly renderer: Renderer,
    public readonly camera: Camera,
    public readonly mainScene: Scene
  ) {
  }

  public start(): void
  {
    this.mainScene.entities.forEach(entity => entity.onStart())
  }

  public update(): void
  {
    this.renderer.render(this.mainScene, this.camera)
    this.mainScene.entities.forEach(entity => entity.onUpdate())
  }
}