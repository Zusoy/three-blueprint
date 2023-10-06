import 'reflect-metadata'

function Description(metadata: string) {
  return function (constructor: Function) {
    Reflect.defineMetadata('description', metadata, constructor, 'description')
  }
}

export default Description