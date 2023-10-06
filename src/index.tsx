import React from 'react'
import { NodeTypeFactory } from 'TreeEditor/Config/NodeTypeFactory'
import { PortTypeFactory } from 'TreeEditor/Config/PortTypeFactory'
import { TreeFactory } from 'TreeEditor/Factory/TreeFactory'
import { Game, Scene, GameObject } from 'Game'
import { FlumeConfig, PortTypeConfig } from 'flume'
import * as NodeBuilders from 'TreeEditor/Factory/Node'
import * as THREE from 'three'
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

const buildGame = (): Game => {
  const renderer = new THREE.WebGLRenderer()
  renderer.shadowMap.enabled = true
  renderer.setSize(window.innerWidth, window.innerHeight)

  const light = new THREE.DirectionalLight(0xffffff, 1)
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 5
  light.position.z = 3
  light.position.y = 2
  light.castShadow = true

  const scene = new Scene()
  const game = new Game(renderer, camera, scene)

  const cube = GameObject.Cube({ width: 1, height: 1, depth: 1, color: '#00cec9' })
  game.mainScene.addEntity(cube)
  game.mainScene.add(light)

  document.querySelector('#game')?.appendChild(renderer.domElement)

  return game
}

const treeEditorConfig = getEditorConfig()
const treeFactory = getTreeFactory()
const game = buildGame()

root.render(
  <React.StrictMode>
    <App
      editorConfig={ treeEditorConfig }
      treeFactory={ treeFactory }
      game={ game }
    />
  </React.StrictMode>
)