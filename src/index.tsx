import React from 'react'
import { NodeTypeFactory } from 'TreeEditor/Config/NodeTypeFactory'
import { PortTypeFactory } from 'TreeEditor/Config/PortTypeFactory'
import { TreeFactory } from 'TreeEditor/Factory/TreeFactory'
import { FlumeConfig, PortTypeConfig } from 'flume'
import * as NodeBuilders from 'TreeEditor/Factory/Node'
import ReactDOM from 'react-dom/client'
import App from 'App'
import './style.css'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

const getEditorConfig = (): FlumeConfig => {
  const portTypeFactory = new PortTypeFactory()
  const nodeTypeFactory = new NodeTypeFactory()

  const editorNodeTypes = [
    nodeTypeFactory.createRootNode(),
    ...nodeTypeFactory.createActions(),
    ...nodeTypeFactory.createDecorators(),
    ...nodeTypeFactory.createComposites()
  ]

  const editorPortTypes: PortTypeConfig[] = [
    ...portTypeFactory.createScalarNodePortTypes(),
    portTypeFactory.createNodePortType()
  ]

  const editorConfig = new FlumeConfig()
  editorPortTypes.map(port => editorConfig.addPortType(port))
  editorNodeTypes.map(node => editorConfig.addNodeType(node))

  return editorConfig
}

const getTreeFactory = (): TreeFactory => {
  const factory = new TreeFactory(
    new NodeBuilders.AggregateBuilder([
      new NodeBuilders.LogBuilder(),
      new NodeBuilders.RepeaterBuilder(),
      new NodeBuilders.RootBuilder(),
      new NodeBuilders.SequencerBuilder(),
      new NodeBuilders.WaitBuilder()
    ])
  )

  return factory
}

const treeEditorConfig = getEditorConfig()
const treeFactory = getTreeFactory()

root.render(
  <React.StrictMode>
    <App
      editorConfig={ treeEditorConfig }
      treeFactory={ treeFactory }
    />
  </React.StrictMode>
)