import { NodeTypeConfig, PortType, PortTypeBuilder } from 'flume'
import { InputControlConfiguration } from 'TreeEditor/Core/Metadata/InputControl'
import * as Actions from 'TreeEditor/Core/Actions'
import * as Decorators from 'TreeEditor/Core/Decorators'
import * as Composites from 'TreeEditor/Core/Composites'
import 'reflect-metadata'

export class NodeTypeFactory
{
  private readonly controlTypes: string[] = [ 'string', 'boolean', 'number' ]

  public createRootNode(): NodeTypeConfig
  {
    return ({
      type: 'root',
      root: true,
      label: 'Root',
      addable: false,
      deletable: false,
      outputs: ports => [
        ports.node(),
      ]
    })
  }

  public createActions(): NodeTypeConfig[]
  {
    const actionsTypes: NodeTypeConfig[] = []

    for (const action of Object.values(Actions)) {
      const description = Reflect.getMetadata('description', action, 'description')

      actionsTypes.push(({
        type: action.name.toLowerCase(),
        label: action.name,
        description: description || 'An action node',
        initialWidth: 200,
        inputs: ports => {
          const claimedInputs = this.getMetadataInputs(action.prototype, ports)

          return [
            ...claimedInputs,
            ports.node()
          ]
        }
      }))
    }

    return actionsTypes
  }

  public createDecorators(): NodeTypeConfig[]
  {
    const decoratorTypes: NodeTypeConfig[] = []

    for (const decorator of Object.values(Decorators)) {
      const description = Reflect.getMetadata('description', decorator, 'description')

      decoratorTypes.push(({
        type: decorator.name.toLowerCase(),
        label: decorator.name,
        description: description || 'A decorator node',
        initialWidth: 200,
        inputs: ports => [
          ports.node()
        ],
        outputs: ports => [
          ports.node({
            hidePort: true
          })
        ]
      }))
    }

    return decoratorTypes
  }

  public createComposites(): NodeTypeConfig[]
  {
    const compositeTypes: NodeTypeConfig[] = []

    for (const composite of Object.values(Composites)) {
      const description = Reflect.getMetadata('description', composite, 'description')

      compositeTypes.push(({
        type: composite.name.toLowerCase(),
        label: composite.name,
        description: description || 'A composite node',
        initialWidth: 200,
        inputs: ports => [
          ports.node()
        ],
        outputs: ports => [
          ports.node()
        ]
      }))
    }

    return compositeTypes
  }

  private getMetadataInputs(target: Object, ports: { [portType: string]: PortTypeBuilder }): PortType[]
  {
    const inputPorts: PortType[] = []

    for (const type of this.controlTypes) {
      const claimedInput = Reflect.getMetadata('input', target, `${type}-input`) as InputControlConfiguration

      if (!claimedInput) {
        continue
      }

      inputPorts.push({
        ...ports[type](),
        label: claimedInput.label,
        name: claimedInput.name
      })
    }

    return inputPorts
  }
}