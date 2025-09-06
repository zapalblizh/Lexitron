import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Board from './Board.jsx'

createRoot(document.getElementById('board')).render(
  <StrictMode>
          <Board />
  </StrictMode>,
)
