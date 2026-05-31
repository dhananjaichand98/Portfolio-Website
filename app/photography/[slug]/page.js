import Link from "next/link";
import { notFound } from "next/navigation";
import parks from "@/content/parks.json";

export function generateStaticParams() {
  return parks.map((park) => ({ slug: park.slug }));
}

export function generateMetadata({ params }) {
  const park = parks.find((item) => item.slug === params.slug);

  if (!park) {
    return {
      title: "Park Not Found | Dhananjai Chand"
    };
  }

  return {
    title: `${park.name} Photography | Dhananjai Chand`,
    description: park.description
  };
}

export default function ParkPhotographyPage({ params }) {
  const park = parks.find((item) => item.slug === params.slug);

  if (!park) {
    notFound();
  }

  return (
    <main className="photo-page">
      <div className="photo-shell">
        <header className="photo-header">
          <Link href="/photography" className="photo-back-link">
            All Parks
          </Link>
          <p className="eyebrow">{park.location}</p>
          <h1>{park.name}</h1>
          <p className="photo-intro">{park.description}</p>
        </header>

        <section className="park-gallery" aria-label={`${park.name} gallery`}>
          {park.photos.map((photo, index) => (
            <figure className="park-shot" key={`${park.slug}-${index}-${photo.src}`}>
              <img src={photo.src} alt={`${park.name} photo ${index + 1}`} />
              <figcaption>{photo.caption}</figcaption>
            </figure>
          ))}
        </section>
      </div>
    </main>
  );
}
