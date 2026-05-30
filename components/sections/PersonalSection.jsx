export default function PersonalSection({ profile }) {
  return (
    <section id="personal" className="content-section offscreen-section" aria-labelledby="personal-title">
      <div className="section-heading" data-reveal>
        <p className="eyebrow">Offscreen</p>
        <h2 id="personal-title">The rest of the operating system.</h2>
      </div>

      <div className="offscreen-layout">
        <div className="personal-note" data-reveal>
          <p>
            I like portfolios that leave room for the human being. These are the details that make
            the professional story feel less airbrushed and more lived-in.
          </p>
        </div>

        <div className="personal-list">
          {profile.personality.map((item) => (
            <article className="personal-card" key={item.title} data-reveal>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>

        <div className="story-slot" data-reveal>
          <span>Open story slot</span>
          <p>
            This is where I would add one short, specific anecdote: a trail you remember, a game
            that shaped your taste, a match you watched, or a tiny personal ritual before shipping.
          </p>
        </div>
      </div>
    </section>
  );
}
