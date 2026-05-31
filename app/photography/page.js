import Link from "next/link";
import parks from "@/content/parks.json";

export const metadata = {
  title: "National Park Photography | Dhananjai Chand",
  description: "A running collection of national park photography studies by Dhananjai Chand."
};

export default function PhotographyIndexPage() {
  return (
    <main className="photo-page">
      <div className="photo-shell">
        <header className="photo-header">
          <Link href="/" className="photo-back-link">
            Back to Portfolio
          </Link>
          <p className="eyebrow">Photography</p>
          <h1>National Park Field Frames</h1>
          <p className="photo-intro">
            Collections organized by park. Open any park to view the full set.
          </p>
        </header>

        <section className="park-grid" aria-label="National parks">
          {parks.map((park) => (
            <article className="park-card" key={park.slug}>
              <Link href={`/photography/${park.slug}`} className="park-card-link">
                <div className="park-cover">
                  <img src={park.cover} alt={`${park.name} cover`} />
                </div>
                <div className="park-meta">
                  <h2>{park.name}</h2>
                  <p className="park-location">{park.location}</p>
                  <p>{park.description}</p>
                  <span className="park-count">{park.photos.length} photos</span>
                </div>
              </Link>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
