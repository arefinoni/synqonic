
"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const scrambleCharacters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*+-=/<>?";

type ScrambleTextProps = {
  text: string;
  trigger?: "appear" | "hover" | "appear-and-hover";
  className?: string;
};

function randomCharacter() {
  return scrambleCharacters[
    Math.floor(Math.random() * scrambleCharacters.length)
  ];
}

export function ScrambleText({
  text,
  trigger = "appear",
  className = "",
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const animationRef = useRef<number | null>(null);

  const scramble = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayText(text);
      return;
    }

    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
    }

    const startedAt = performance.now();
    const duration = 700;

    const update = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const resolvedCharacters = Math.floor(progress * text.length);

      const nextText = text
        .split("")
        .map((character, index) => {
          if (character === " " || index < resolvedCharacters) {
            return character;
          }
          return randomCharacter();
        })
        .join("");

      setDisplayText(nextText);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(update);
      } else {
        animationRef.current = null;
        setDisplayText(text);
      }
    };

    animationRef.current = requestAnimationFrame(update);
  }, [text]);

  useEffect(() => {
    let startTimer: number | undefined;
    if (trigger === "appear" || trigger === "appear-and-hover") {
      startTimer = window.setTimeout(scramble, 0);
    }

    return () => {
      if (startTimer !== undefined) {
        window.clearTimeout(startTimer);
      }
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [scramble, trigger]);

  const handleHover = () => {
    if (trigger === "hover" || trigger === "appear-and-hover") {
      scramble();
    }
  };

  return (
    <span
      className={`inline-grid ${className}`}
      onMouseEnter={handleHover}
      onFocus={handleHover}
    >
      <span
        className="invisible col-start-1 row-start-1"
        aria-hidden="true"
      >
        {text}
      </span>

      <span
        className="col-start-1 row-start-1"
        aria-hidden="true"
      >
        {displayText}
      </span>

      <span className="sr-only">{text}</span>
    </span>
  );
}
