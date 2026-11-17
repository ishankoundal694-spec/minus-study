import type { Metadata } from "next";
import { ProgressPage } from "@/components/ProgressPage";

export const metadata: Metadata = { title: "My Progress" };

export default function ProgressRoute() {
  return <ProgressPage />;
}
