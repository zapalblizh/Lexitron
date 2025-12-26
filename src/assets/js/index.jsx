import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react';
import App from "./App.jsx";
import {GameProvider} from "./GameContext.jsx";

createRoot(document.getElementById('lexiscore-game')).render(
    <StrictMode>
        <GameProvider>
            <App />
        </GameProvider>
    </StrictMode>
);
