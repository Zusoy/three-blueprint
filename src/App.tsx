import React, { useRef, useState } from 'react'
import { TreeFactory } from 'TreeEditor/Factory/TreeFactory'
import { Context, Tree } from 'TreeEditor/Core'
import { FlumeConfig, NodeMap } from 'flume'
import { Game } from 'Game'
import Box from '@mui/material/Box'
import EditorControls from 'EditorControls'
import TreeEditor from 'TreeEditor/Editor'
import Theme from 'Theme'

declare interface Props {
  readonly treeFactory: TreeFactory
  readonly editorConfig: FlumeConfig
  readonly game: Game
  readonly context: Context
}

const App: React.FC<Props> = ({ treeFactory, editorConfig, game, context }) => {
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
    behaviour.bind(context)

    game.start()
    update(behaviour)
  }

  const update = (behaviour: Tree) => {
    requestId.current = requestAnimationFrame(() => update( behaviour ))

    behaviour.update()
    game.update()
  }

  const stop = () => {
    if (!requestId.current) {
      return
    }

    cancelAnimationFrame(requestId.current)
    setIsInPlayMod(false)
  }

  return (
    <Theme>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <EditorControls onPlay={ start } onStop={ stop } isPlaying={ isInPlayMod } />
        { !isInPlayMod &&
          <TreeEditor
            width={ window.innerWidth }
            height={ window.innerHeight }
            config={ editorConfig }
            onMapChange={ map => setNodeMap(map) }
          />
        }
      </Box>
    </Theme>
  )
}

export default App