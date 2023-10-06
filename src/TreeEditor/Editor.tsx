import React from 'react'
import { NodeEditor, FlumeConfig, NodeMap } from 'flume'
import { RootNode } from 'TreeEditor/Core'

declare type OnNodeMapChangeHandler = (map: NodeMap) => void

declare interface Props {
  readonly width: number
  readonly height: number
  readonly config: FlumeConfig
  readonly onMapChange: OnNodeMapChangeHandler
}

const Editor: React.FC<Props> = ({ width, height, config, onMapChange }) =>
  <div style={{ width, height }}>
    <NodeEditor
      nodeTypes={ config.nodeTypes }
      portTypes={ config.portTypes }
      defaultNodes={ [ { type: RootNode.Type } ] }
      onChange={ onMapChange }
    />
  </div>

export default Editor