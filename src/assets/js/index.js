import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react';
import { GameProvider } from "./GameContext.js";

import App from "./App.js";

createRoot(document.getElementById('lexitron-game')).render(
    <StrictMode>
        <GameProvider>
            <App />
        </GameProvider>
    </StrictMode>
);
