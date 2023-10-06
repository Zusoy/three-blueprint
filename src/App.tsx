import React, { useEffect, useRef, useState } from 'react'
import { TreeFactory } from 'TreeEditor/Factory/TreeFactory'
import { Tree } from 'TreeEditor/Core'
import { FlumeConfig, NodeMap } from 'flume'
import TreeEditor from 'TreeEditor/Editor'

declare interface Props {
  readonly treeFactory: TreeFactory
  readonly editorConfig: FlumeConfig
}

const App: React.FC<Props> = ({ treeFactory, editorConfig }) => {
  const requestId = useRef<number>()
  const [ isInPlayMod, setIsInPlayMod ] = useState<boolean>(false)
  const [ nodeMap, setNodeMap ] = useState<NodeMap>()

  const start = () => {
    if (requestId.current) {
      cancelAnimationFrame(requestId.current)
    }

    if (!nodeMap) {
      return
    }

    setIsInPlayMod(true)
    const behaviour = treeFactory.buildFromFlumeMap(nodeMap)
    update(behaviour)
  }

  const stop = () => {
    if (!requestId.current) {
      return
    }

    cancelAnimationFrame(requestId.current)
    setIsInPlayMod(false)
  }

  const update = (behaviour: Tree) => {
    behaviour.update()

    requestId.current = requestAnimationFrame(() => update( behaviour ))
  }

  useEffect(() => {
    console.log(isInPlayMod)
  }, [ isInPlayMod ])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <div style={{ display: 'flex', gap: 4 }}>
        <button style={{ width: 80, height: 50 }} onClick={ () => start() }>Play</button>
        <button style={{ width: 80, height: 50 }} onClick={ () => stop() }>Stop</button>
      </div>
      <TreeEditor
        width={ 900 }
        height={ 900 }
        config={ editorConfig }
        onMapChange={ map => setNodeMap(map) }
      />
    </div>
  )
}

export default App