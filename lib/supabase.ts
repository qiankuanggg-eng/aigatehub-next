import { createClient } from "@supabase/supabase-js";

export type UsageLogRow = {
  id: string;
  user_id: string;
  type: "Chat" | "Image2";
  model: string;
  prompt_summary: string;
  cost_cny: number;
  status: string;
  response_time_ms: number;
  created_at: string;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const demoUserId =
  process.env.NEXT_PUBLIC_DEMO_USER_ID ?? "00000000-0000-0000-0000-000000000001";

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl as string, supabaseAnonKey as string)
  : null;
