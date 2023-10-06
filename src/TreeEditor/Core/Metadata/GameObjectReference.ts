import 'reflect-metadata'

declare interface GameObjectReferenceConfiguration {
  readonly name: string
  readonly label: string
}

function GameObjectReference(metadata: GameObjectReferenceConfiguration) {
  return function (target: Object, _propertyKey: string) {
    Reflect.defineMetadata('input', metadata, target, 'gameObject-input')
  }
}

export default GameObjectReference