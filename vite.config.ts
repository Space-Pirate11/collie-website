import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');

  // Validate required environment variables
  const requiredEnvVars = ['VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY'];
  const missingEnvVars = requiredEnvVars.filter(key => !env[key]);
  
  if (missingEnvVars.length > 0) {
    console.error('❌ Missing required environment variables:');
    missingEnvVars.forEach(key => console.error(`   - ${key}`));
    console.error('\nPlease add them to your .env file or Netlify environment variables.');
    if (mode === 'production') {
      throw new Error('Missing required environment variables');
    }
  }

  return {
    plugins: [react()],
    build: {
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            animations: ['framer-motion'],
            ui: ['lucide-react'],
            supabase: ['@supabase/supabase-js', '@supabase/ssr'],
          },
        },
      },
      target: 'esnext',
      minify: 'esbuild',
      sourcemap: true,
    },
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
  };
});
