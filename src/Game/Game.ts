import { Renderer, Camera } from 'three'
import { Scene } from 'Game/Scene'

export class Game
{
  constructor(
    protected readonly renderer: Renderer,
    protected readonly camera: Camera,
    protected readonly mainScene: Scene
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