import type { Metadata } from "next";
import { SubjectsPage } from "@/components/SubjectsPage";

export const metadata: Metadata = { title: "Subjects" };

export default function SubjectsRoute() {
  return <SubjectsPage />;
}
