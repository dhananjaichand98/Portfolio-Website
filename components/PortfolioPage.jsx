"use client";

import { useEffect, useMemo, useState } from "react";

export default function PortfolioPage({ site, profile, projects, skills, experience }) {
  const [activeSection, setActiveSection] = useState("about");

  const formConfigured = useMemo(
    () => !site.formspreeEndpoint.includes("your-form-id"),
    [site.formspreeEndpoint]
  );

  useEffect(() => {
    const root = document.documentElement;

    const syncScrollOffset = () => {
      root.style.setProperty("--scroll-offset", `${window.scrollY * 0.08}px`);
    };

    syncScrollOffset();
    window.addEventListener("scroll", syncScrollOffset, { passive: true });

    return () => {
      window.removeEventListener("scroll", syncScrollOffset);
    };
  }, []);

  useEffect(() => {
    const items = Array.from(document.querySelectorAll("[data-reveal]"));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -8% 0px"
      }
    );

    items.forEach((item) => observer.observe(item));

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("section[id]"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.35,
        rootMargin: "-20% 0px -40% 0px"
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="portfolio-shell">
      <div className="page-decor" aria-hidden="true">
        <span className="color-blob blob-blue" />
        <span className="color-blob blob-mint" />
        <span className="color-blob blob-rose" />
      </div>

      <header className="top-nav">
        <a href="#top" className="brand-link">
          <span className="brand-dot" />
          {profile.name}
        </a>

        <nav aria-label="Primary navigation">
          <ul className="nav-list">
            {site.navigation.map((item) => {
              const isActive = item.href === `#${activeSection}`;

              return (
                <li key={item.href}>
                  <a href={item.href} className={isActive ? "is-active" : ""}>
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-text" data-reveal>
            <p className="eyebrow">Open to frontend opportunities</p>
            <h1 id="hero-title">{profile.name}</h1>
            <p className="hero-role">{site.heroTagline}</p>
            <p className="hero-subtitle">{site.heroSubtitle}</p>

            <div className="hero-actions">
              <a className="btn btn-primary" href={site.primaryCta.href}>
                {site.primaryCta.label}
              </a>
              <a className="btn btn-secondary" href={site.secondaryCta.href}>
                {site.secondaryCta.label}
              </a>
            </div>

            <ul className="social-list" aria-label="Social links">
              {profile.socials.map((social) => {
                const external = social.url.startsWith("http");

                return (
                  <li key={social.label}>
                    <a
                      href={social.url}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noreferrer" : undefined}
                    >
                      {social.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="hero-visual" data-reveal>
            <article className="profile-card">
              <img src={profile.photo} alt={`${profile.name} profile portrait`} />
              <div className="profile-meta">
                <p>{profile.role}</p>
                <p>{profile.location}</p>
              </div>
            </article>

            <article className="sketch-card">
              <p className="sketch-title">Playful but intentional</p>
              <p>Designing smooth UI journeys, one thoughtful pixel at a time.</p>
            </article>
          </div>
        </section>

        <section id="about" className="content-section" aria-labelledby="about-title">
          <div className="section-heading" data-reveal>
            <p className="eyebrow">About</p>
            <h2 id="about-title">Engineer mindset. Human story.</h2>
          </div>

          <div className="about-grid">
            <div className="about-copy" data-reveal>
              {profile.about.map((paragraph, index) => (
                <p key={`${index}-${paragraph.slice(0, 24)}`}>{paragraph}</p>
              ))}
            </div>

            <div className="personality-grid" data-reveal>
              {profile.personality.map((item) => (
                <article className="personality-card" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="content-section" aria-labelledby="projects-title">
          <div className="section-heading" data-reveal>
            <p className="eyebrow">Projects</p>
            <h2 id="projects-title">Selected Work</h2>
          </div>

          <div className="projects-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.title} data-reveal>
                <div className="project-header">
                  <h3>{project.title}</h3>
                  <span className="project-status">{project.status}</span>
                </div>

                <p>{project.summary}</p>

                <ul className="stack-list" aria-label={`${project.title} tech stack`}>
                  {project.stack.map((tech, index) => (
                    <li key={`${project.title}-${index}-${tech}`}>{tech}</li>
                  ))}
                </ul>

                <div className="project-links">
                  {project.demoUrl !== "#" ? (
                    <a href={project.demoUrl} target="_blank" rel="noreferrer">
                      Live Demo
                    </a>
                  ) : (
                    <span className="placeholder-link">Demo soon</span>
                  )}
                  {project.repoUrl !== "#" ? (
                    <a href={project.repoUrl} target="_blank" rel="noreferrer">
                      Source
                    </a>
                  ) : (
                    <span className="placeholder-link">Source soon</span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="content-section" aria-labelledby="skills-title">
          <div className="section-heading" data-reveal>
            <p className="eyebrow">Skills</p>
            <h2 id="skills-title">Tools and craft I use daily</h2>
          </div>

          <div className="skills-grid">
            {skills.map((group) => (
              <article className="skills-card" key={group.category} data-reveal>
                <h3>{group.category}</h3>
                <ul>
                  {group.items.map((skill, index) => (
                    <li key={`${group.category}-${index}-${skill}`}>{skill}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="content-section" aria-labelledby="experience-title">
          <div className="section-heading" data-reveal>
            <p className="eyebrow">Experience</p>
            <h2 id="experience-title">Career timeline</h2>
          </div>

          <div className="experience-list">
            {experience.map((item) => (
              <article className="experience-card" key={`${item.role}-${item.company}`} data-reveal>
                <div className="experience-header">
                  <h3>{item.role}</h3>
                  <p>{item.dates}</p>
                </div>
                <p className="experience-meta">
                  {item.company} | {item.location}
                </p>
                <ul>
                  {item.highlights.map((highlight, index) => (
                    <li key={`${item.company}-${index}-${highlight.slice(0, 20)}`}>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="content-section" aria-labelledby="contact-title">
          <div className="section-heading" data-reveal>
            <p className="eyebrow">Contact</p>
            <h2 id="contact-title">Let&apos;s build something meaningful</h2>
          </div>

          <div className="contact-grid" data-reveal>
            <div className="contact-copy">
              <p>
                Reach out for frontend engineering opportunities, product collaboration, or
                conversations around UX and performance.
              </p>
              <p>
                Prefer email? <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </p>
              <ul className="social-list" aria-label="Social links in contact section">
                {profile.socials.map((social) => {
                  const external = social.url.startsWith("http");

                  return (
                    <li key={`${social.label}-contact`}>
                      <a
                        href={social.url}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noreferrer" : undefined}
                      >
                        {social.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            <form action={site.formspreeEndpoint} method="POST" className="contact-form">
              <input type="hidden" name="_subject" value="Portfolio contact from website" />

              <label htmlFor="name">Name</label>
              <input id="name" name="name" type="text" required />

              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" required />

              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" required />

              <button type="submit" className="btn btn-primary">
                Send Message
              </button>

              {!formConfigured ? (
                <p className="form-note">
                  Set your Formspree endpoint in <code>content/site.json</code> before going live.
                </p>
              ) : null}
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>
          {new Date().getFullYear()} {profile.name}. Built with Next.js and deployed on GitHub
          Pages.
        </p>
      </footer>
    </div>
  );
}
