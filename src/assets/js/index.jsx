import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react';
import App from "./App.jsx";

createRoot(document.getElementById('lexitron-game')).render(
    <StrictMode>
        <App />
    </StrictMode>
);
