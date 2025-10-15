FROM e2bdev/code-interpreter:latest

WORKDIR /home/user

RUN npm create vite@latest . -- --template react && \
    npm install

RUN echo "import { defineConfig } from 'vite'\nimport react from '@vitejs/plugin-react'\n\nexport default defineConfig({\n  plugins: [react()],\n  server: {\n    allowedHosts: true,\n    host: process.env.HOST || '0.0.0.0',\n    port: process.env.PORT || 5173\n  }\n})" > vite.config.js

RUN chmod -R 777 /home/user/node_modules

