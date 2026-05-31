export default function EducationSection({ education }) {
  return (
    <section id="education" className="content-section education-section" aria-labelledby="education-title">
      <div className="section-heading" data-reveal>
        <p className="eyebrow">Education</p>
        <h2 id="education-title">Academic foundation behind the practice.</h2>
      </div>

      <div className="education-strip" data-reveal aria-label="Education">
        {education.map((item) => (
          <article className="education-card" key={`${item.school}-${item.dates}`}>
            <span>{item.dates}</span>
            <h3>{item.school}</h3>
            <p>{item.degree}</p>
            {item.grade ? <p className="education-grade">{item.grade}</p> : null}
          </article>
        ))}
      </div>
    </section>
  );
}
