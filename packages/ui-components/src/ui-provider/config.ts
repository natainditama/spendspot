"use client";

type CSSVariables = Record<string, string>;

export const config: Record<"light" | "dark", CSSVariables> = {
  light: {
    "--primary": "#171717",
    "--primary-foreground": "#fafafa",
    "--card": "#ffffff",
    "--secondary": "#f5f5f5",
    "--secondary-foreground": "#171717",
    "--background": "#ffffff",
    "--popover": "#ffffff",
    "--popover-foreground": "#0a0a0a",
    "--muted": "#f5f5f5",
    "--muted-foreground": "#737373",
    "--destructive": "#e7000b",
    "--foreground": "#0a0a0a",
    "--border": "#e5e5e5",
    "--input": "#e5e5e5",
    "--ring": "#d4d4d4",
    "--accent": "#f7f7f7",
    "--accent-foreground": "#343434",
  },
  dark: {
    "--primary-foreground": "#171717",
    "--primary": "#fff5f5",
    "--card": "#171717",
    "--secondary": "#262626",
    "--secondary-foreground": "#fafafa",
    "--background": "#0a0a0a",
    "--popover": "#171717",
    "--popover-foreground": "#fafafa",
    "--muted": "#262626",
    "--muted-foreground": "#a1a1a1",
    "--destructive": "#ff6467",
    "--foreground": "#fafafa",
    "--border": "#2e2e2e",
    "--input": "#2e2e2e",
    "--accent": "#262626",
    "--accent-foreground": "#fafafa",
    "--ring": "#737373",
  },
};
