import site from "@/content/site.json";
import profile from "@/content/profile.json";
import projects from "@/content/projects.json";
import skills from "@/content/skills.json";
import experience from "@/content/experience.json";
import education from "@/content/education.json";
import publications from "@/content/publications.json";
import PortfolioPage from "@/components/PortfolioPage";

export default function Home() {
  return (
    <PortfolioPage
      site={site}
      profile={profile}
      projects={projects}
      skills={skills}
      experience={experience}
      publications={publications}
      education={education}
    />
  );
}
