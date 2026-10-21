import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const rawApi = env.VITE_API || 'http://localhost:5000/api/'
  
  let proxyTarget = 'http://localhost:5000'
  try {
    const parsed = new URL(rawApi)
    proxyTarget = parsed.origin
  } catch (e) {
    proxyTarget = 'http://localhost:5000'
  }

  return {
    plugins: [react()],
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: proxyTarget,
          changeOrigin: true
        }
      }
    }
  }
})
