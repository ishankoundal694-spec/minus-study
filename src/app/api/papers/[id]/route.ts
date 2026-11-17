import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/papers-admin";
export const runtime = "nodejs";
export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { supabase } = await requireAdmin(request); const { id } = await context.params;
    const body = await request.json();
    const updates = { title: String(body.title ?? "").trim().slice(0, 140), subject: String(body.subject ?? "").trim().slice(0, 60), year: String(body.year ?? "").trim().slice(0, 20) };
    if (!updates.title || !updates.subject || !updates.year) return NextResponse.json({ error: "Title, subject and year are required." }, { status: 400 });
    const { data, error } = await supabase.from("study_papers").update(updates).eq("id", id).select().single();
    if (error) throw error; return NextResponse.json({ paper: data });
  } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Update failed" }, { status: 403 }); }
}
export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { supabase } = await requireAdmin(request); const { id } = await context.params;
    const { data: paper, error: readError } = await supabase.from("study_papers").select("storage_path").eq("id", id).single();
    if (readError) throw readError;
    const { error: fileError } = await supabase.storage.from("minus-study-papers").remove([paper.storage_path]); if (fileError) throw fileError;
    const { error } = await supabase.from("study_papers").delete().eq("id", id); if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Delete failed" }, { status: 403 }); }
}
