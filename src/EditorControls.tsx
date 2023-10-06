import React from 'react'
import Box from '@mui/material/Box'
import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'
import PlayArrow from '@mui/icons-material/PlayArrow'
import Stop from '@mui/icons-material/Stop'

declare type OnPlayHandler = () => void
declare type OnStopHandler = () => void

declare interface Props {
  readonly onPlay: OnPlayHandler
  readonly onStop: OnStopHandler
  readonly isPlaying: boolean
}

const EditorControls: React.FC<Props> = ({ onPlay, onStop, isPlaying }) =>
  <Box sx={{ display: 'flex', justifyContent: 'center', padding: 1 }}>
    <ButtonGroup variant='outlined'>
      <Button onClick={ () => onPlay() } variant={ isPlaying ? 'contained' : 'outlined' }><PlayArrow /></Button>
      <Button onClick={ () => onStop() }><Stop /></Button>
    </ButtonGroup>
  </Box>

export default EditorControls