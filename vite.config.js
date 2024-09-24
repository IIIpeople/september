import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { defineConfig, createServer } from 'vite'
import vue from '@vitejs/plugin-vue'
import mkcert from "vite-plugin-mkcert";//自定义安全证书
import basicSsl from '@vitejs/plugin-basic-ssl';//自定义安全证书
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // basicSsl(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    vue(),
    // legacy({
    //   targets: ['chrome >= 61'], // 针对部分低版本安卓的兼容处理
    // }),
  ],
  server: {
    host: '0.0.0.0',
    port: 7443,//设置服务启动端口号，是一个可选项，不要设置为本机的端口号，可能会发生冲突
    // open: true,//是否自动打开浏览器，可选项
    // cors: true,//允许跨域
    // https: true
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: 'Peson-dist'
  }
})
// // 额外的配置步骤，创建HTTPS服务器
// async function createHttpsServer() {
//   const https = require('https');
//   const fs = require('fs');

//   // 自签名证书路径
//   const privateKey = fs.readFileSync('path/to/private.key', 'utf8');
//   const certificate = fs.readFileSync('path/to/certificate.crt', 'utf8');
//   const ca = fs.readFileSync('path/to/ca.cert', 'utf8');

//   const credentials = { key: privateKey, cert: certificate, ca: ca };

//   const server = https.createServer(credentials, (req, res) => {
//     // 处理请求
//     res.writeHead(200);
//     res.end('hello world\n');
//   });

//   server.listen(7443, () => {
//     console.log('HTTPS server is running on https://localhost');
//   });
// }

// createServer({
//   // Vite配置...
// }).then(createHttpsServer);
