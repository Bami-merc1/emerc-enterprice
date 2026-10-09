import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bplaaokrmzcuuqfdfhnj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwbGFhb2tybXpjdXVxZmRmaG5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk0OTk5OTQsImV4cCI6MjEwNTA3NTk5NH0.uiLyURMX3s7e52jMZrI258gg5X2xxIRzeFQ0AjUefSw';

console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
export const supabase = createClient(supabaseUrl, supabaseAnonKey);