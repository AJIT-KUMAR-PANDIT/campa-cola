import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  assetsInclude: ["**/*.glb"],
  server: {
    host: true,
    hmr: {
      host: '6e990add2cad.ngrok-free.app',
      protocol: 'wss',
    },
  },
});
