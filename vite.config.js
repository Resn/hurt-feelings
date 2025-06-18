import path from "node:path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";

import viteCompression from "vite-plugin-compression";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@/": `${path.resolve(__dirname, "src")}/`,
      "~/": `${path.resolve(__dirname, "src")}/`,
      "gsap/": `${path.resolve(__dirname, "node_modules/gsap/esm")}/`
    },
  },

  publicDir: 'public',
  root: '.',
  base: '/',


  assetsInclude: [
    "**/*.gltf",
    "**/*.glb",
    "**/*.hdr",
    "**/*.exr",
    "**/*.jpg",
    "**/*.jpeg",
    "**/*.png",
    "**/*.gif",
    "**/*.svg",
    "**/*.webp"
  ],


  plugins: [
    vue(),
  ],
  build: {
    outDir: "dist",
    manifest: true,
    cssCodeSplit: true,
    assetsDir: 'assets',
    lib: {
      entry: path.resolve(__dirname, "src/main.js"),
      name: "SharedComponents",
      fileName: (format) => `bundle.js`,
      formats: ["es"],
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true, // Forces everything into a single file
        manualChunks: undefined // Prevents code splitting
      },
      external: [
        /public\/webflow\/.*/
      ]

    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: ` 
            @use "sass:math";
            @use "sass:color";
            @use "sass:map";
        `,
      },
    },
  },
  server: {
    port: 3333,
    strictPort: true,
    host: true,
    fs: {
      strict: false,
      allow: ['..']
    }

  }



});
