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
import PublicationsSection from "@/components/sections/PublicationsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";

function setupRevealObserver() {
  const items = Array.from(document.querySelectorAll("[data-reveal]"));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion) {
    items.forEach((item) => item.classList.add("is-visible"));
    return () => {};
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
  return () => observer.disconnect();
}

function setupActiveSectionObserver(setActiveSection) {
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
  return () => observer.disconnect();
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
  const [activeSection, setActiveSection] = useState("about");
  const [theme, setTheme] = useState("light");

  const formConfigured = useMemo(
    () => !site.formspreeEndpoint.includes("your-form-id"),
    [site.formspreeEndpoint]
  );

  useEffect(() => setupRevealObserver(), []);
  useEffect(() => setupActiveSectionObserver(setActiveSection), []);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    const nextTheme = savedTheme === "dark" ? "dark" : "light";
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

      <main id="top">
        <HeroSection profile={profile} site={site} />
        <AboutSection profile={profile} />
        <ProjectsSection projects={projects} />
        <SkillsSection skills={skills} />
        <ExperienceSection experience={experience} />
        <PublicationsSection publications={publications} />
        <EducationSection education={education} />
        <ContactSection profile={profile} site={site} formConfigured={formConfigured} />
      </main>

      <SiteFooter name={profile.name} />
    </div>
  );
}
