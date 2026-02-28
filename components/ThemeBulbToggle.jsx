"use client";

import { useEffect, useRef, useState } from "react";

export default function ThemeBulbToggle({ isDarkMode, onToggleTheme }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isReleasing, setIsReleasing] = useState(false);
  const [pullOffset, setPullOffset] = useState(0);

  const startYRef = useRef(0);
  const pullOffsetRef = useRef(0);

  useEffect(() => {
    pullOffsetRef.current = pullOffset;
  }, [pullOffset]);

  useEffect(() => {
    if (!isDragging) {
      return undefined;
    }

    const handlePointerMove = (event) => {
      const delta = event.clientY - startYRef.current;
      const clamped = Math.max(0, Math.min(delta, 62));
      setPullOffset(clamped);
    };

    const finishPull = () => {
      const shouldToggle = pullOffsetRef.current > 30;
      setIsDragging(false);
      setIsReleasing(true);
      setPullOffset(0);

      window.setTimeout(() => setIsReleasing(false), 280);

      if (shouldToggle) {
        onToggleTheme();
      }
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", finishPull);
    window.addEventListener("pointercancel", finishPull);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", finishPull);
      window.removeEventListener("pointercancel", finishPull);
    };
  }, [isDragging, onToggleTheme]);

  const handlePointerDown = (event) => {
    event.preventDefault();
    startYRef.current = event.clientY;
    setIsDragging(true);
    setIsReleasing(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onToggleTheme();
    }
  };

  return (
    <button
      type="button"
      className={`theme-pull ${isDragging ? "is-dragging" : ""} ${isReleasing ? "is-releasing" : ""} ${isDarkMode ? "is-on" : "is-off"}`}
      style={{ "--pull-offset": `${pullOffset}px` }}
      aria-label="Pull and release to toggle dark mode"
      onPointerDown={handlePointerDown}
      onKeyDown={handleKeyDown}
    >
      <span className="bulb-cord" />
      <span className="bulb-knob" />
      <span className="bulb-wrap">
        <span className="bulb-glow" />
        <img
          className="bulb-icon"
          src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4a1.svg"
          alt=""
          aria-hidden="true"
          draggable="false"
        />
      </span>
    </button>
  );
}
