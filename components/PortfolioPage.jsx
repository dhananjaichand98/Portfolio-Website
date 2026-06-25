"use client";

import { useEffect, useMemo, useState } from "react";
import SiteFooter from "@/components/SiteFooter";
import TopNav from "@/components/TopNav";
import ThemeBulbToggle from "@/components/ThemeBulbToggle";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";
import EducationSection from "@/components/sections/EducationSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import HeroSection from "@/components/sections/HeroSection";
// import PersonalSection from "@/components/sections/PersonalSection";
import PublicationsSection from "@/components/sections/PublicationsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";

function setupRevealObserver() {
  const items = Array.from(document.querySelectorAll("[data-reveal]"));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return () => {};
  }

  document.documentElement.classList.add("reveal-enabled");

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
      threshold: 0.01,
      rootMargin: "0px"
    }
  );

  items.forEach((item) => {
    const rect = item.getBoundingClientRect();
    const isInView = rect.top < window.innerHeight && rect.bottom > 0;

    if (isInView) {
      item.classList.add("is-visible");
    } else {
      observer.observe(item);
    }
  });

  return () => {
    observer.disconnect();
    document.documentElement.classList.remove("reveal-enabled");
  };
}

function setupActiveSectionObserver(setActiveSection, navigation) {
  const navSectionIds = navigation
    .map((item) => item.href.replace("#", ""))
    .filter(Boolean);
  const getSections = () =>
    navSectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

  const updateActiveSection = () => {
    const sections = getSections();
    const navBottom = document.querySelector(".top-nav")?.getBoundingClientRect().bottom ?? 0;
    const readingLine = navBottom + 72;
    const sectionPositions = sections.map((section) => {
      const rect = section.getBoundingClientRect();

      return {
        id: section.id,
        top: rect.top
      };
    });
    const previousSections = sectionPositions.filter((section) => section.top <= readingLine);
    const isAtPageEnd =
      window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
    const currentSection = isAtPageEnd
      ? sectionPositions[sectionPositions.length - 1]
      : previousSections[previousSections.length - 1] || sectionPositions[0];

    if (currentSection?.id) {
      setActiveSection(currentSection.id);
    }
  };

  updateActiveSection();
  window.addEventListener("scroll", updateActiveSection, { passive: true });
  window.addEventListener("resize", updateActiveSection);

  return () => {
    window.removeEventListener("scroll", updateActiveSection);
    window.removeEventListener("resize", updateActiveSection);
  };
}

export default function PortfolioPage({
  site,
  profile,
  projects,
  skills,
  experience,
  publications,
  education
}) {
  const [activeSection, setActiveSection] = useState("start");
  const [theme, setTheme] = useState("dark");

  const formConfigured = useMemo(
    () => !site.formspreeEndpoint.includes("your-form-id"),
    [site.formspreeEndpoint]
  );

  useEffect(() => setupRevealObserver(), []);
  useEffect(() => setupActiveSectionObserver(setActiveSection, site.navigation), [site.navigation]);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    const nextTheme = savedTheme === "light" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="portfolio-shell">
      <ThemeBulbToggle isDarkMode={theme === "dark"} onToggleTheme={toggleTheme} />
      <TopNav profileName={profile.name} navigation={site.navigation} activeSection={activeSection} />

      <main id="top" className="story-main">
        <HeroSection profile={profile} site={site} />
        <div className="section-interlude interlude-origin" data-reveal>
          <p>
            I did not plan a straight line. I kept following the hard problems and built taste in
            the process.
          </p>
        </div>
        <AboutSection profile={profile} />
        <ExperienceSection experience={experience} />
        <div className="section-interlude interlude-cases" data-reveal>
          <p>The interesting part of a project is the tradeoff you made when nobody was watching.</p>
        </div>
        <ProjectsSection projects={projects} />
        <SkillsSection skills={skills} />
        <PublicationsSection publications={publications} />
        <EducationSection education={education} />
        {/* <div className="section-interlude interlude-personal" data-reveal>
          <p>The human side is not extra context. It is the context.</p>
        </div>
        <PersonalSection profile={profile} /> */}
        <ContactSection profile={profile} site={site} formConfigured={formConfigured} />
      </main>

      <SiteFooter name={profile.name} />
    </div>
  );
}
