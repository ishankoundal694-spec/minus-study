"use client";

import Link from "next/link";
import {
  BookOpen, Calculator, ClipboardList, ExternalLink, FileText, Filter,
  Landmark, LibraryBig, RotateCcw, Search, ShieldCheck,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Badge, Card, EmptyState, PageIntro } from "@/components/ui";
import { CURRICULUM_NOTICE, OFFICIAL_LINKS, allChapters, subjects } from "@/lib/curriculum";
import { libraryResources, resourceTypes, subjectName } from "@/lib/resources";
import type { LibraryResource } from "@/lib/types";

const PAGE_SIZE = 12;

function ResourceIcon({ resource }: { resource: LibraryResource }) {
  if (resource.type === "Formula sheet") return <Calculator size={19} aria-hidden="true" />;
  if (resource.type === "Revision guide") return <RotateCcw size={19} aria-hidden="true" />;
  if (resource.type === "Sample paper") return <ClipboardList size={19} aria-hidden="true" />;
  if (resource.type === "Notes") return <FileText size={19} aria-hidden="true" />;
  if (resource.type === "Syllabus") return <Landmark size={19} aria-hidden="true" />;
  if (resource.type === "Official paper") return <ClipboardList size={19} aria-hidden="true" />;
  return <BookOpen size={19} aria-hidden="true" />;
}

export function LibraryPage({ initialSubject = "", initialChapter = "" }: { initialSubject?: string; initialChapter?: string }) {
  const [query, setQuery] = useState("");
  const [subjectId, setSubjectId] = useState(subjects.some((subject) => subject.id === initialSubject) ? initialSubject : "");
  const [chapterId, setChapterId] = useState(allChapters.some((chapter) => chapter.id === initialChapter) ? initialChapter : "");
  const [type, setType] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const chapters = useMemo(() => subjectId ? subjects.find((subject) => subject.id === subjectId)?.chapters ?? [] : allChapters, [subjectId]);

  useEffect(() => { setVisible(PAGE_SIZE); }, [query, subjectId, chapterId, type]);
  useEffect(() => {
    if (chapterId && !chapters.some((chapter) => chapter.id === chapterId)) setChapterId("");
  }, [chapterId, chapters]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return libraryResources.filter((resource) => {
      if (subjectId && resource.subjectId !== subjectId && resource.subjectId !== null) return false;
      if (chapterId && resource.chapterId !== chapterId) return false;
      if (type && resource.type !== type) return false;
      if (!needle) return true;
      const chapter = resource.chapterId ? allChapters.find((item) => item.id === resource.chapterId) : null;
      const haystack = [
        resource.title, resource.description, resource.type, resource.source,
        subjectName(resource.subjectId), chapter?.title ?? "", chapter?.topics.join(" ") ?? "",
      ].join(" ").toLowerCase();
      return haystack.includes(needle);
    });
  }, [query, subjectId, chapterId, type]);

  const shown = filtered.slice(0, visible);
  const hasFilters = Boolean(query || subjectId || chapterId || type);

  return (
    <div className="animate-enter space-y-7">
      <PageIntro
        eyebrow="Study material"
        title="Study Library"
        description="Search original notes, formula sheets and revision guides, plus official HPBOSE/NCERT links. No copyrighted textbook is copied or redistributed."
        action={<a href={OFFICIAL_LINKS.bookList2026} target="_blank" rel="noopener noreferrer" className="btn-secondary"><ExternalLink size={16} aria-hidden="true" />Official book list</a>}
      />

      <Card className="flex flex-col gap-3 border-blue-100 bg-blue-50/50 p-4 sm:flex-row sm:items-start">
        <ShieldCheck size={20} className="mt-0.5 shrink-0 text-blue-600" aria-hidden="true" />
        <div>
          <p className="text-sm font-bold text-slate-900">Official-source policy</p>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">{CURRICULUM_NOTICE} External links open the publisher or Board website; Minus Study does not claim unavailable PDFs or create fake download buttons.</p>
        </div>
      </Card>

      <Card className="p-4 sm:p-5">
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1.3fr)_repeat(3,minmax(0,0.8fr))]">
          <div className="relative">
            <Search size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <label className="sr-only" htmlFor="library-search">Search study material</label>
            <input id="library-search" className="input pl-10" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search title, topic, chapter or source…" />
          </div>
          <div>
            <label className="sr-only" htmlFor="subject-filter">Filter by subject</label>
            <select id="subject-filter" className="input" value={subjectId} onChange={(event) => setSubjectId(event.target.value)}>
              <option value="">All subjects</option>
              {subjects.map((subject) => <option key={subject.id} value={subject.id}>{subject.name}</option>)}
            </select>
          </div>
          <div>
            <label className="sr-only" htmlFor="chapter-filter">Filter by chapter</label>
            <select id="chapter-filter" className="input" value={chapterId} onChange={(event) => setChapterId(event.target.value)}>
              <option value="">All chapters</option>
              {chapters.map((chapter) => <option key={chapter.id} value={chapter.id}>{chapter.title}</option>)}
            </select>
          </div>
          <div>
            <label className="sr-only" htmlFor="type-filter">Filter by resource type</label>
            <select id="type-filter" className="input" value={type} onChange={(event) => setType(event.target.value)}>
              <option value="">All types</option>
              {resourceTypes.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <p className="flex items-center gap-2 text-sm font-medium text-slate-600" aria-live="polite"><Filter size={15} aria-hidden="true" />{filtered.length} resource{filtered.length === 1 ? "" : "s"} found</p>
          {hasFilters && <button type="button" className="btn-ghost" onClick={() => { setQuery(""); setSubjectId(""); setChapterId(""); setType(""); }}>Clear filters</button>}
        </div>
      </Card>

      {shown.length === 0 ? (
        <EmptyState title="No resources match" description="Try a broader search or clear the filters. Official books may be listed under “All subjects”." icon={<LibraryBig size={20} aria-hidden="true" />} />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {shown.map((resource) => (
            <Card key={resource.id} hover className="flex flex-col p-5">
              <div className="flex items-start justify-between gap-3">
                <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${resource.official ? "bg-blue-50 text-blue-700" : "bg-slate-100 text-slate-700"}`}><ResourceIcon resource={resource} /></span>
                <div className="flex flex-wrap justify-end gap-1.5">
                  <Badge tone={resource.official ? "blue" : "slate"}>{resource.type}</Badge>
                  {resource.official && <Badge tone="green">Official source</Badge>}
                </div>
              </div>
              <h2 className="mt-4 text-base font-bold leading-snug text-slate-950">{resource.title}</h2>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">{resource.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5 text-xs text-slate-500">
                <span className="rounded-md bg-slate-100 px-2 py-1">{subjectName(resource.subjectId)}</span>
                {resource.chapterId && <span className="rounded-md bg-slate-100 px-2 py-1">{allChapters.find((chapter) => chapter.id === resource.chapterId)?.title}</span>}
              </div>
              <div className="mt-auto pt-5">
                {resource.external ? (
                  <a href={resource.href} target="_blank" rel="noopener noreferrer" className="btn-secondary w-full"><ExternalLink size={15} aria-hidden="true" />Open official source</a>
                ) : (
                  <Link href={resource.href} className="btn-primary w-full"><BookOpen size={15} aria-hidden="true" />Open guide</Link>
                )}
                <p className="mt-2 text-center text-xs text-slate-400">Source: {resource.source}</p>
              </div>
            </Card>
          ))}
        </div>
      )}

      {visible < filtered.length && (
        <div className="flex justify-center">
          <button type="button" className="btn-secondary" onClick={() => setVisible((count) => count + PAGE_SIZE)}>Load more resources ({filtered.length - visible} remaining)</button>
        </div>
      )}
    </div>
  );
}
