import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves from /<repo-name>/ — update if your repo name differs
  base: '/security-map/',
})
