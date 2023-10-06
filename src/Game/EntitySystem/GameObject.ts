import { BoxGeometry, ColorRepresentation, Mesh, MeshStandardMaterial, Scene } from 'three'
import { Component } from 'Game/EntitySystem/Component'
import { ISceneEntity } from 'Game/EntitySystem/ISceneEntity'

export class GameObject extends Mesh implements ISceneEntity
{
  protected readonly components: Component[] = []

  public static Cube(config: {width: number, height: number, depth: number, color: ColorRepresentation}): GameObject
  {
    return new GameObject(
      new BoxGeometry(config.width, config.height, config.depth),
      new MeshStandardMaterial({ color: config.color })
    );
  }

  public onStart(): void
  {
    this.components.forEach(cmp => cmp.start())
  }

  public onUpdate(): void
  {
    this.components.forEach(cmp => cmp.update())
  }

  public onEnable(scene: Scene): void
  {
    scene.add(this)
  }

  public getComponent<T extends Component>(componentCtr: T): T|null
  {
    for (let i = 0; i < this.components.length; i++) {
      const comp = this.components[i]

      if (typeof(comp) === typeof(componentCtr)) {
        return comp as T
      }
    }

    return null
  }

  public addComponent<T extends Component>(component: T): void
  {
    this.components.push(component)
  }
}