export default function SkillsSection({ skills }) {
  return (
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
  );
}
