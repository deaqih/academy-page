import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

if (!process.env.SUPABASE_URL) throw new Error('SUPABASE_URL is required');
if (!process.env.SUPABASE_ANON_KEY) throw new Error('SUPABASE_ANON_KEY is required');

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: false
    }
  }
);

export type Article = {
  id: string;
  title: string;
  image_url: string;
  author: string;
  publish_date: string;
  content: string;
  slug: string;
  created_at: string;
}; 