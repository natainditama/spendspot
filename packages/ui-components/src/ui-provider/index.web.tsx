"use client";

import React, { useCallback, useEffect, useLayoutEffect } from "react";
import { OverlayProvider } from "@gluestack-ui/core/overlay/creator";
import { ToastProvider } from "@gluestack-ui/core/toast/creator";
import { script } from "./script";

export type ModeType = "light" | "dark" | "system";

export const useSafeLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function UIProvider({ mode = "light", ...props }: { mode?: ModeType; children?: React.ReactNode }) {
  const handleMediaQuery = useCallback((e: MediaQueryListEvent) => {
    script(e.matches ? "dark" : "light");
  }, []);

  useSafeLayoutEffect(() => {
    if (mode === "system") return;
    const documentElement = document.documentElement;

    if (!documentElement) return;
    documentElement.classList.add(mode);

    documentElement.classList.remove(mode === "light" ? "dark" : "light");
    documentElement.style.colorScheme = mode;
  }, [mode]);

  useSafeLayoutEffect(() => {
    if (mode !== "system") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", handleMediaQuery);
      return () => media.removeEventListener("change", handleMediaQuery);
    }

    const legacyMedia = media as unknown as {
      addListener: (cb: (e: MediaQueryListEvent) => void) => void;
      removeListener: (cb: (e: MediaQueryListEvent) => void) => void;
    };

    if (typeof legacyMedia.addListener === "function") {
      legacyMedia.addListener(handleMediaQuery);
      return () => legacyMedia.removeListener(handleMediaQuery);
    }
  }, [handleMediaQuery, mode]);

  return (
    <>
      <script
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: `(${script.toString()})('${mode}')`,
        }}
      />
      <OverlayProvider>
        <ToastProvider>{props.children}</ToastProvider>
      </OverlayProvider>
    </>
  );
}
