/**
 * Inline DOM script updating root document class list and color schemes.
 * Applies system theme or designated mode to prevent hydration flashes.
 */
export const script = (mode: string) => {
  const documentElement = document.documentElement;

  function getSystemColorMode() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  try {
    const isSystem = mode === "system";
    const theme = isSystem ? getSystemColorMode() : mode;

    documentElement.classList.remove(theme === "light" ? "dark" : "light");
    documentElement.classList.add(theme);
    documentElement.style.colorScheme = theme;
  } catch (e) {
    console.error(e);
  }
};
