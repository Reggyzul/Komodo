import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  (import.meta.env.VITE_SUPABASE_URL as string) ||
  "https://ulwwqclgkynugmgsiuiq.supabase.co";

const supabaseAnonKey =
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string) ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsd3dxY2xna3ludWdtZ3NpdWlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc2MjUyMzksImV4cCI6MjEwMzIwMTIzOX0.KO7wNM7fCkAVUjcnu7x1f0Y060uFKJZRP4WShZjfI04";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
