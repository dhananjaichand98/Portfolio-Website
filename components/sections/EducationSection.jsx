export default function EducationSection({ education }) {
  return (
    <section id="education" className="content-section" aria-labelledby="education-title">
      <div className="section-heading" data-reveal>
        <p className="eyebrow">Education</p>
        <h2 id="education-title">Academic foundation</h2>
      </div>

      <div className="education-list">
        {education.map((item) => (
          <article className="education-card" key={`${item.school}-${item.dates}`} data-reveal>
            <div className="education-header">
              <div>
                <h3>{item.school}</h3>
                <p>{item.degree}</p>
              </div>
              <span>{item.dates}</span>
            </div>

            <dl className="education-meta-list">
              <div>
                <dt>Grade</dt>
                <dd>{item.grade}</dd>
              </div>
              {item.activities ? (
                <div>
                  <dt>Activities</dt>
                  <dd>{item.activities}</dd>
                </div>
              ) : null}
            </dl>

            {item.courses ? (
              <div className="education-courses">
                <p>Courses Taken</p>
                <ul>
                  {item.courses.map((course) => (
                    <li key={`${item.school}-${course}`}>{course}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
