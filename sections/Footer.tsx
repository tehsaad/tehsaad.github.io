import Link from "next/link";
import { Clock } from "@/components/Clock";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="px-gutter mx-auto max-w-[1600px] pb-10">
      <div className="label grid gap-4 border-t border-line pt-6 text-dim sm:grid-cols-3">
        <p>
          <span className="text-bone">{site.name}</span> · built by hand, {new Date().getFullYear()}
        </p>
        <p className="sm:text-center">
          Instrument Serif · Geist · Next.js · no templates
        </p>
        <p className="flex justify-between gap-4 sm:justify-end">
          <Clock />
          <Link href="/#bench" className="text-bone-2 transition-colors hover:text-signal">
            cd ~ ↑
          </Link>
        </p>
      </div>
    </footer>
  );
}
