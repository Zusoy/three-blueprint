import { Scene as ThreeScene } from 'three'
import { ISceneEntity } from 'Game/EntitySystem/ISceneEntity'

export class Scene extends ThreeScene
{
  public readonly entities: ISceneEntity[] = []

  public addEntity(entity: ISceneEntity): void
  {
    this.entities.push(entity)
    entity.onEnable(this)
  }
}