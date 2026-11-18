"use client";

import { useEffect } from "react";
import { ErrorState } from "@/components/ui";

export default function ErrorBoundary({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Keep the error in the browser console for debugging; avoid exposing details in the UI.
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-xl py-12">
      <ErrorState message="This page could not be displayed. Your saved progress has not been changed." onRetry={reset} />
    </div>
  );
}
