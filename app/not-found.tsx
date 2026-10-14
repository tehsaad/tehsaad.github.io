import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="px-gutter mx-auto flex min-h-[100svh] max-w-[1600px] flex-col justify-center pt-[var(--bar-h)]">
      <p className="label text-signal">exit code 404</p>
      <h1 className="display mt-6 text-[clamp(3.5rem,12vw,11rem)] text-bone">
        No such
        <br />
        <em className="text-bone-2">file or directory.</em>
      </h1>
      <Link
        href="/"
        className="label mt-12 w-fit border border-line-strong px-4 py-3 text-bone transition-colors hover:border-signal hover:text-signal"
      >
        cd ~/bench
      </Link>
    </main>
  );
}
