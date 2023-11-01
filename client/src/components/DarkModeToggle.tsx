import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const html = document.querySelector("html");
    if (html) {
      if (isDark) {
        html.dataset.theme = "theme-dark";
      } else {
        html.dataset.theme = "theme-light";
      }
    }
  }, [isDark]);

  const systemPrefersDark = useMediaQuery(
    {
      query: "(prefers-color-scheme: dark)",
    },
    undefined,
    (isSystemDark) => setIsDark(isSystemDark)
  );

  return (
    <button onClick={() => setIsDark(!isDark)} aria-label="Dark mode toggle" />
  );
};
