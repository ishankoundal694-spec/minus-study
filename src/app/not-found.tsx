import Link from "next/link";
import { EmptyState } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl py-12">
      <EmptyState
        title="Page not found"
        description="That chapter or page does not exist. Return to your dashboard or browse the subjects."
        action={<Link href="/" className="btn-primary">Go to dashboard</Link>}
      />
    </div>
  );
}
