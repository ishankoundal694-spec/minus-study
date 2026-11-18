import { NextRequest, NextResponse } from "next/server";
import { requireAdmin, serviceClient, type PaperCategory } from "@/lib/papers-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const bucket = "minus-study-papers";

export async function GET(request: NextRequest) {
  try {
    const category = request.nextUrl.searchParams.get("category");
    const supabase = serviceClient();
    let query = supabase.from("study_papers").select("id,title,category,subject,year,storage_path,file_size,created_at").order("created_at", { ascending: false });
    if (category === "previous-year" || category === "model") query = query.eq("category", category);
    const { data, error } = await query;
    if (error) throw error;
    const papers = await Promise.all((data ?? []).map(async (paper) => {
      const { data: signed } = await supabase.storage.from(bucket).createSignedUrl(paper.storage_path, 60 * 30, { download: paper.title.endsWith(".pdf") ? paper.title : `${paper.title}.pdf` });
      return { ...paper, url: signed?.signedUrl ?? null };
    }));
    return NextResponse.json({ papers }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Could not load papers" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { supabase } = await requireAdmin(request);
    const form = await request.formData();
    const file = form.get("file");
    const title = String(form.get("title") ?? "").trim().slice(0, 140);
    const subject = String(form.get("subject") ?? "").trim().slice(0, 60);
    const year = String(form.get("year") ?? "").trim().slice(0, 20);
    const category = String(form.get("category") ?? "") as PaperCategory;
    if (!(file instanceof File) || file.type !== "application/pdf" || !file.size) return NextResponse.json({ error: "Choose a valid PDF file." }, { status: 400 });
    if (file.size > 50 * 1024 * 1024) return NextResponse.json({ error: "PDF must be 50 MB or smaller." }, { status: 400 });
    if (!title || !subject || !year || !["previous-year", "model"].includes(category)) return NextResponse.json({ error: "Complete title, subject, year and category." }, { status: 400 });
    const id = crypto.randomUUID();
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-100) || "paper.pdf";
    const path = `${category}/${subject.toLowerCase().replace(/[^a-z0-9]+/g, "-")}/${year}/${id}-${safeName}`;
    const bytes = new Uint8Array(await file.arrayBuffer());
    const { error: uploadError } = await supabase.storage.from(bucket).upload(path, bytes, { contentType: "application/pdf", upsert: false });
    if (uploadError) throw uploadError;
    const { data, error } = await supabase.from("study_papers").insert({ id, title, subject, year, category, storage_path: path, file_size: file.size }).select().single();
    if (error) { await supabase.storage.from(bucket).remove([path]); throw error; }
    return NextResponse.json({ paper: data }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Upload failed" }, { status: 403 });
  }
}
