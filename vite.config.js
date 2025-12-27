import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import netlify from "@netlify/vite-plugin";
// https://vite.dev/config/

export default defineConfig({
    plugins: [react(), tailwindcss(), netlify()],
    server: {
        port: 3000,
        open: true,
        host: true
    },
    build: {
        outDir: 'dist',
        sourcemap: false,
        minify: 'esbuild',
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom']
                }
            }
        }
    }
})

