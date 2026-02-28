import { Button, Form, Input, Label, TextArea, TextField } from "react-aria-components";

export default function ContactSection({ profile, site, formConfigured }) {
  return (
    <section id="contact" className="content-section" aria-labelledby="contact-title">
      <div className="section-heading" data-reveal>
        <p className="eyebrow">Contact</p>
        <h2 id="contact-title">Let&apos;s build something meaningful</h2>
      </div>

      <div className="contact-grid" data-reveal>
        <div className="contact-copy">
          <p>
            Reach out for frontend engineering opportunities, product collaboration, or
            conversations around UX and performance.
          </p>
          <p>
            Prefer email? <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </p>
          <ul className="social-list" aria-label="Social links in contact section">
            {profile.socials.map((social) => {
              const external = social.url.startsWith("http");

              return (
                <li key={`${social.label}-contact`}>
                  <a
                    href={social.url}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer" : undefined}
                  >
                    {social.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <Form action={site.formspreeEndpoint} method="POST" className="contact-form">
          <input type="hidden" name="_subject" value="Portfolio contact from website" />

          <TextField name="name" isRequired>
            <Label>Name</Label>
            <Input />
          </TextField>

          <TextField name="email" type="email" isRequired>
            <Label>Email</Label>
            <Input />
          </TextField>

          <TextField name="message" isRequired>
            <Label>Message</Label>
            <TextArea rows={5} />
          </TextField>

          <Button type="submit" className="btn btn-primary">
            Send Message
          </Button>

          {!formConfigured ? (
            <p className="form-note">
              Set your Formspree endpoint in <code>content/site.json</code> before going live.
            </p>
          ) : null}
        </Form>
      </div>
    </section>
  );
}
