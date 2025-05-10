import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? '';

// Create a single instance to reuse
export const supabase = createBrowserClient(
  // Use runtime config injection to prevent build-time secret exposure
  typeof window !== 'undefined' ? (window as any).__SUPABASE_URL__ ?? supabaseUrl : supabaseUrl,
  typeof window !== 'undefined' ? (window as any).__SUPABASE_ANON_KEY__ ?? supabaseAnonKey : supabaseAnonKey
); 