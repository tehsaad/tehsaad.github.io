import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/CaseStudy";
import { builds, getBuild } from "@/data/builds";
import { Footer } from "@/sections/Footer";

export const dynamicParams = false;

export function generateStaticParams() {
  return builds.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: PageProps<"/builds/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const b = getBuild(slug);
  if (!b) return {};
  return {
    title: `${b.name}: build sheet`,
    description: `${b.oneLiner} ${b.summary}`,
    alternates: { canonical: `/builds/${b.slug}` },
    openGraph: { title: `${b.name} · TehSaad`, description: b.oneLiner, url: `/builds/${b.slug}`, type: "article" },
  };
}

export default async function BuildPage({ params }: PageProps<"/builds/[slug]">) {
  const { slug } = await params;
  const build = getBuild(slug);
  if (!build) notFound();

  const i = builds.indexOf(build);
  const next = builds[(i + 1) % builds.length];

  return (
    <>
      <main id="main" className="pt-[var(--bar-h)]">
        <nav aria-label="Breadcrumb" className="px-gutter mx-auto max-w-[1400px] pt-8">
          <Link href="/#builds" className="label text-dim transition-colors hover:text-signal">
            ← cd ~/builds
          </Link>
        </nav>
        <CaseStudy build={build} headingLevel="h1" />
        <div className="px-gutter mx-auto max-w-[1400px] pb-24">
          <Link href={`/builds/${next.slug}`} className="group block border-t border-line pt-8">
            <span className="label text-dim">next build →</span>
            <span className="display mt-3 block text-[clamp(2.4rem,6vw,5rem)] text-bone-2 transition-colors group-hover:text-signal">
              {next.name}
            </span>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
