import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      // Options for image optimization
      jpg: {
        quality: 80,
      },
      jpeg: {
        quality: 80,
      },
      png: {
        quality: 80,
      },
      webp: {
        lossless: false,
      },
      avif: {
        lossless: false,
      },
      // Generate multiple sizes for responsive images
      includePublic: true,
      logStats: true,
      // Skip if image is already optimized
      skipIfLarger: true,
    }),
  ],
  // OptimizeDeps for better caching
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  // Build configuration
  build: {
    target: 'esnext',
    minify: 'terser',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          three: ['three', '@react-three/fiber', '@react-three/drei'],
        },
      },
    },
  },
});
