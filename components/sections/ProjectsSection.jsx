"use client";

import { useMemo, useState } from "react";

export default function ProjectsSection({ projects }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const featuredProjects = useMemo(() => projects.slice(0, 4), [projects]);
  const additionalProjects = useMemo(() => projects.slice(4), [projects]);
  const visibleProjects = isExpanded ? projects : featuredProjects;

  return (
    <section id="projects" className="content-section cases-section" aria-labelledby="projects-title">
      <div className="section-heading" data-reveal>
        <p className="eyebrow">Case Files</p>
        <h2 id="projects-title">Projects I would rather explain as questions than trophies.</h2>
      </div>

      <div className="case-grid">
        {visibleProjects.map((project, index) => {
          const hasSource = project.repoUrl && project.repoUrl !== "#";
          const hasDemo = project.demoUrl && project.demoUrl !== "#";
          const isExtended = index >= 4;
          const cardClassName = isExtended ? "case-file case-file-extended" : "case-file";

          return (
            <article className={cardClassName} key={`${project.title}-${project.status}`}>
              <div className="case-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="case-header">
                <h3>{project.title}</h3>
                <span className="project-status">{project.status}</span>
              </div>

              {project.angle ? <p className="project-angle">{project.angle}</p> : null}
              {project.question ? <p className="case-question">{project.question}</p> : null}
              <p>{project.summary}</p>
              {project.lesson ? <p className="project-lesson">{project.lesson}</p> : null}

              <ul className="stack-list" aria-label={`${project.title} tech stack`}>
                {project.stack.map((tech, index) => (
                  <li key={`${project.title}-${index}-${tech}`}>{tech}</li>
                ))}
              </ul>

              {hasSource ? (
                <div className="project-links">
                  <a href={project.repoUrl} target="_blank" rel="noreferrer">
                    Source
                  </a>
                  {hasDemo ? (
                    <a href={project.demoUrl} target="_blank" rel="noreferrer">
                      Demo
                    </a>
                  ) : null}
                </div>
              ) : null}
            </article>
          );
        })}
      </div>

      {additionalProjects.length ? (
        <div className="case-more-wrap">
          <button
            type="button"
            className="case-more-button"
            onClick={() => setIsExpanded((current) => !current)}
          >
            {isExpanded
              ? "Show fewer projects"
              : `See ${additionalProjects.length} more projects`}
          </button>
        </div>
      ) : null}
    </section>
  );
}
