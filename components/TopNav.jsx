"use client";

import { useState } from "react";

export default function TopNav({ profileName, navigation, activeSection }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="top-nav">
      <button
        type="button"
        className="nav-toggle"
        aria-expanded={isMenuOpen}
        aria-controls="primary-navigation"
        aria-label="Toggle navigation menu"
        onClick={() => setIsMenuOpen((current) => !current)}
      >
        <span />
        <span />
        <span />
      </button>

      <a href="#top" className="brand-link">
        <span className="brand-dot" />
        {profileName}
      </a>

      <div className="nav-palette" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>

      <nav
        id="primary-navigation"
        className={isMenuOpen ? "is-open" : ""}
        aria-label="Primary navigation"
      >
        <ul className="nav-list">
          {navigation.map((item) => {
            const isActive = item.href === `#${activeSection}`;

            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={isActive ? "is-active" : ""}
                  onClick={() => setIsMenuOpen(false)}
                >
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
