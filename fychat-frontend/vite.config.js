import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    proxy: {
      '/ws': {
        target: 'http://localhost:8082', 
        ws: true, 
        changeOrigin: true,
      },
    },
  },
  plugins:[react()],
});
