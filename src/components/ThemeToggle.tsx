"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full bg-glass-bg border border-glass flex items-center justify-center">
        <span className="w-5 h-5 opacity-0"></span>
      </div>
    );
  }

  const currentTheme = theme === "system" ? resolvedTheme : theme;

  return (
    <button
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      className="relative w-10 h-10 flex items-center justify-center rounded-full bg-glass-bg border border-glass-border hover:bg-glass-hover hover:border-glass-border/50 transition-all text-foreground/70 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-neon-blue/50"
      aria-label="Toggle theme"
    >
      <Sun className="h-5 w-5 absolute transition-all dark:-rotate-90 dark:scale-0 scale-100 rotate-0" />
      <Moon className="h-5 w-5 absolute transition-all dark:rotate-0 dark:scale-100 scale-0 -rotate-90" />
    </button>
  );
}
