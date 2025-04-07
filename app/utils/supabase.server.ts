import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as bcrypt from 'bcryptjs';

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

export interface TrainingProgram {
  id: string;
  title: string;
  slug: string;
  description: string;
  duration: string;
  level: string;
  participants: number;
  language: string;
  image_url: string;
  category: string;
  created_at: string;
  instructor_id: string;
}

export async function getTrainingPrograms(page: number = 1, limit: number = 3) {
  const start = (page - 1) * limit;
  const end = start + limit - 1;

  console.log('Fetching training programs...');
  console.log('Page:', page, 'Limit:', limit, 'Start:', start, 'End:', end);

  try {
    const { data, error, count } = await supabase
      .from('trainings')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(start, end);

    if (error) {
      console.error('Error fetching training programs:', error);
      throw error;
    }

    console.log('Successfully fetched programs:', data?.length || 0);
    console.log('Total count:', count);

    return {
      programs: data || [],
      totalCount: count || 0
    };
  } catch (error) {
    console.error('Error in getTrainingPrograms:', error);
    return {
      programs: [],
      totalCount: 0
    };
  }
}

export async function createDummyUsers() {
  const dummyUsers = [
    {
      email: "admin@academy.com",
      password_hash: "Admin123!"
    },
    {
      email: "editor@academy.com",
      password_hash: "Editor123!"
    },
    {
      email: "trainer@academy.com",
      password_hash: "Trainer123!"
    }
  ];

  try {
    for (const user of dummyUsers) {
      // Insert into users table with plain password
      const { error: insertError } = await supabase
        .from("users")
        .insert({
          email: user.email,
          password: user.password_hash // Store plain password
        });

      if (insertError) {
        console.error(`Error inserting user ${user.email}:`, insertError);
        continue;
      }

      console.log(`Successfully created user: ${user.email}`);
    }

    return { success: true };
  } catch (error) {
    console.error("Error creating dummy users:", error);
    return { success: false, error };
  }
}

export async function verifyUser(email: string, password: string) {
  try {
    // Get user from database
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !user) {
      return { success: false, error: "User not found" };
    }

    // Verify password (without hashing)
    if (password !== user.password) {
      return { success: false, error: "Invalid password" };
    }

    return { success: true, user };
  } catch (error) {
    console.error("Error verifying user:", error);
    return { success: false, error };
  }
} 