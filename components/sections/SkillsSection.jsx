export default function SkillsSection({ skills }) {
  return (
    <section id="toolbox" className="content-section workbench-section" aria-labelledby="toolbox-title">
      <div className="section-heading" data-reveal>
        <p className="eyebrow">Workbench</p>
        <h2 id="toolbox-title">The stack matters. The habits matter more.</h2>
      </div>

      <div className="workbench-layout">
        <p className="workbench-note" data-reveal>
          I use tools as leverage for clearer product behavior: faster feedback loops, better
          migrations, fewer ambiguous states, and interfaces teams can keep improving.
        </p>

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
      </div>
    </section>
  );
}
