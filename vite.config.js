import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/

export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
    if (command === 'serve') {
        return {
            plugins: [react(), tailwindcss()],
            server: {
                port: 3000,
                open: true,
                host: true
            }
        }

    } else {
        // Build for production
        return {
            plugins: [react(), tailwindcss()],
            build: {
                outDir: '_site',
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
        }
    }
})

