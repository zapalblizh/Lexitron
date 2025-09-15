import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {GameManager} from "./GameManager.jsx";

createRoot(document.getElementById('board')).render(
  <StrictMode>
      <GameManager />
  </StrictMode>
)
