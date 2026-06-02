export default function SkillsSection({ skills }) {
  return (
    <section id="toolbox" className="content-section workbench-section" aria-labelledby="toolbox-title">
      <div className="section-heading" data-reveal>
        <p className="eyebrow">Workbench</p>
        <h2 id="toolbox-title">The stack matters. The habits matter more.</h2>
      </div>

      <div className="workbench-layout">
        <div className="origin-letter workbench-letter" data-reveal>
          <p>
            I use tools as leverage for clearer product behavior: faster feedback loops, better
            migrations, fewer ambiguous states, and interfaces teams can keep improving.
          </p>
          <p>
            The throughline is reliability: predictable components, sensible defaults, and
            debugging paths that are obvious at 2 AM.
          </p>
          <p>
            On the frontend, that means React and TypeScript patterns that make states legible,
            CSS that behaves across screens, and tests that keep the interface honest as it grows.
          </p>
          <p>
            The AI/ML side comes from earlier work in computer vision, NLP, reinforcement
            learning, and search. It keeps me comfortable around ambiguity, signals, and systems
            that need to make careful decisions with incomplete information.
          </p>
        </div>

        <div className="skills-grid" aria-label="Technical stack">
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

      <p className="workbench-ribbon" data-reveal>
        Different tools, same instinct: make complexity easier to use.
      </p>
    </section>
  );
}
