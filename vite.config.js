import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    vue(),
    vueJsx(),
  ],
  build: {
    assetsDir: "static"
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      // 代理 /prod-api 开头的请求
      '/prod-api': {
        target: 'https://sxdj.gov.cn', // 目标服务器
        changeOrigin: true, // 修改请求头中的 Origin
        // rewrite: (path) => path.replace(/^\/prod-api/, ''), // 可选：去掉 /prod-api 前缀
      },
    }
  }
})
