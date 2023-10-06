import { Context } from 'TreeEditor/Core'
import { Colors, Controls, PortTypeConfig } from 'flume'

export class PortTypeFactory
{
  constructor(private readonly context: Context)
  {
  }

  public createScalarNodePortTypes(): PortTypeConfig[]
  {
    return [
      {
        type: 'string',
        name: 'string',
        label: 'Text',
        color: Colors.green,
        controls: [
          Controls.text({
            name: 'string',
            label: 'Text'
          })
        ]
      },
      {
        type: 'boolean',
        name: 'boolean',
        label: 'Bool',
        color: Colors.purple,
        controls: [
          Controls.checkbox({
            name: 'boolean',
            label: 'Bool'
          })
        ]
      },
      {
        type: 'number',
        name: 'number',
        label: 'Number',
        color: Colors.blue,
        controls: [
          Controls.number({
            name: 'number',
            label: 'Number',
            step: 0.01
          })
        ]
      },
      {
        type: 'gameObject',
        name: 'gameObject',
        label: 'gameObject',
        color: Colors.pink,
        controls: [
          Controls.select({
            name: 'gameObject',
            label: 'GameObject',
            options: this.context.scene.entities.map(entity => ({
              label: entity.getName(),
              value: entity.getId()
            }))
          })
        ]
      }
    ]
  }

  public createNodePortType(): PortTypeConfig
  {
    return {
      type: 'node',
      name: 'node',
      label: 'Node',
      color: Colors.grey
    }
  }
}