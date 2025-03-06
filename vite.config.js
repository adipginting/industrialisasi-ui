/**
 * Credit: this vite.config.js file is originally by user aboutaaron on StackOverflow.
 * Link to answer: https://stackoverflow.com/a/71134496/3730919.
 *
 * Under the license of CC BY-SA 4.0 Deed ()
 *
 */

import path from "path";
import tailwindcss from "@tailwindcss/vite";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "./build",
  },
});
