import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { NextRequest } from "next/server";

export type PaperCategory = "previous-year" | "model";
export interface StudyPaper {
  id: string; title: string; category: PaperCategory; subject: string; year: string;
  storage_path: string; file_size: number; created_at: string;
}

export function serviceClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or server-only SUPABASE_SERVICE_ROLE_KEY.");
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

export async function requireAdmin(request: NextRequest) {
  const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!token) throw new Error("Sign in with your admin account first.");
  const supabase = serviceClient();
  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user?.email) throw new Error("Your Supabase session is invalid. Sign in again.");
  const { data: admin, error: adminError } = await supabase.from("admins")
    .select("email, role, active").ilike("email", user.email).maybeSingle();
  if (adminError) throw new Error(`Could not verify admin access: ${adminError.message}`);
  if (!admin || admin.active !== true || !["owner", "admin"].includes(String(admin.role))) {
    throw new Error("This Supabase account is not an active Minus Study admin.");
  }
  return { supabase, user };
}
