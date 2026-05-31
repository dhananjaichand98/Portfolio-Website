import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="photo-page">
      <div className="photo-shell">
        <header className="photo-header">
          <p className="eyebrow">Not Found</p>
          <h1>This page does not exist.</h1>
          <p className="photo-intro">The link may be outdated, or the page may have moved.</p>
          <Link href="/" className="photo-back-link">
            Back to portfolio
          </Link>
        </header>
      </div>
    </main>
  );
}
