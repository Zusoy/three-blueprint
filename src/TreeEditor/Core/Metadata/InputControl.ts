import 'reflect-metadata'

export declare interface InputControlConfiguration {
  readonly name: string
  readonly label: string
  readonly type: string
}

function InputControl(metadata: InputControlConfiguration) {
  return function (target: Object, _propertyKey: string) {
    Reflect.defineMetadata('input', metadata, target, `${metadata.type.toString()}-input`)
  }
}

export default InputControl