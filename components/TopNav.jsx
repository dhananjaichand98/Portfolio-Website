export default function TopNav({ profileName, navigation, activeSection }) {
  return (
    <header className="top-nav">
      <a href="#top" className="brand-link">
        <span className="brand-dot" />
        {profileName}
      </a>

      <nav aria-label="Primary navigation">
        <ul className="nav-list">
          {navigation.map((item) => {
            const isActive = item.href === `#${activeSection}`;

            return (
              <li key={item.href}>
                <a href={item.href} className={isActive ? "is-active" : ""}>
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
