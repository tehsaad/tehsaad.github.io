import Link from "next/link";

export default function NotFound() {
  return (
    <main className="notfound">
      <h1>404</h1>
      <p>This page isn&apos;t here. The site was rebuilt, so older links may have moved.</p>
      <p>
        <Link className="link-pill" href="/">
          Back to the home page
        </Link>
      </p>
    </main>
  );
}
