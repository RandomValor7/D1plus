import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
 plugins: [react()],
 server: {
 // Las peticiones a /api se reenvian al backend (evita CORS)
 proxy: { '/api': 'http://localhost:3000' },
 },
})