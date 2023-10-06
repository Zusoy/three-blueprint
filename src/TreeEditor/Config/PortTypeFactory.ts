import { Colors, Controls, PortTypeConfig } from 'flume'

export class PortTypeFactory
{
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
            label: 'Number'
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