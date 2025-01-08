import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://odamsykfzzcvvuppdcai.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kYW1zeWtmenpjdnZ1cHBkY2FpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYyODQ1MjQsImV4cCI6MjA1MTg2MDUyNH0.zwVQZegac1AYf7Tl9U3icyBAqCrNMzmYoxBlEm3SAVA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
