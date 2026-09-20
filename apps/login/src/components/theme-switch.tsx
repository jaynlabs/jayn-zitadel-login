"use client";

import { ThemeMode } from "@zitadel/proto/zitadel/settings/v2/branding_settings_pb";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useThemeMode } from "./branding-context";

/** The same two-state, quiet word toggle used on jayn.app. */
export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const themeMode = useThemeMode();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || themeMode === ThemeMode.LIGHT || themeMode === ThemeMode.DARK) {
    return null;
  }

  const target = resolvedTheme === "dark" ? "light" : "dark";
  const label = `switch to the ${target} theme`;

  return (
    <button
      type="button"
      onClick={() => setTheme(target)}
      aria-label={label}
      title={label}
      className="jayn-theme-toggle jayn-chrome-control"
    >
      {target}
    </button>
  );
}
