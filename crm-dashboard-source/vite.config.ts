import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: './',
    server: {
        port: 5174,
        host: true
    },
    optimizeDeps: {
        include: ['react-quill-new', 'date-fns', 'lucide-react']
    }
})
