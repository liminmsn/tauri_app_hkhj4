import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths"
import tailwindcss from "@tailwindcss/vite";

const host = process.env.TAURI_DEV_HOST;
// https://vite.dev/config/
export default defineConfig(async ({ mode }) => {
  console.log(mode, process.cwd(), 'yyyyyy');
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), tailwindcss(), tsconfigPaths()],
    resolve: {
      alias: {
        "*": "./src"
      }
    },
    clearScreen: false,
    server: {
      port: 1420,
      strictPort: true,
      host: host || false,
      hmr: host
        ? {
          protocol: "ws",
          host,
          port: 1421,
        }
        : undefined,
      watch: {
        ignored: ["**/src-tauri/**"],
      },
      proxy: {
        '/api': {
          target: env['VITE_URL_USER'],
          // target: "http://8.148.250.179:8080",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        }
      }
    },
  }
});
