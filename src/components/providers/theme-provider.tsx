"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";

type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>;

export { useTheme };

// next-themes injects an inline script for theme initialization.
// React 19 reports this script as a client-rendering error in Next.js 16.
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  const originalConsoleError = console.error;

  console.error = (...args: unknown[]) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("Encountered a script tag")
    ) {
      return;
    }

    originalConsoleError.apply(console, args);
  };
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props} enableSystem>
      {children}
    </NextThemesProvider>
  );
}
