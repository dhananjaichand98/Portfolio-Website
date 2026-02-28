export default function ProjectsSection({ projects }) {
  return (
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
  );
}
