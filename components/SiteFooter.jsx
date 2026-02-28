export default function SiteFooter({ name }) {
  return (
    <footer className="site-footer">
      <p>
        {new Date().getFullYear()} {name}. Built with Next.js and deployed on GitHub Pages.
      </p>
    </footer>
  );
}
