"use client";

import React, { useCallback, useEffect, useLayoutEffect } from "react";
import { config } from "./config";
import { OverlayProvider } from "@gluestack-ui/core/overlay/creator";
import { ToastProvider } from "@gluestack-ui/core/toast/creator";
import { setFlushStyles } from "@gluestack-ui/utils/nativewind-utils";
import { script } from "./script";

const variableStyleTagId = "nativewind-style";

const createStyle = (styleTagId: string) => {
  const style = document.createElement("style");
  style.id = styleTagId;
  style.appendChild(document.createTextNode(""));
  return style;
};

export const useSafeLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function UIProvider({
  mode = "light",
  ...props
}: {
  mode?: "light" | "dark" | "system";
  children?: React.ReactNode;
}) {
  let cssVariablesWithMode = "";

  Object.keys(config).forEach((configKey) => {
    cssVariablesWithMode += configKey === "dark" ? "\n .dark {\n " : "\n:root {\n";

    const currentTheme = config[configKey as keyof typeof config];
    const cssVariables = Object.keys(currentTheme).reduce((acc: string, curr: string) => {
      acc += `${curr}:${currentTheme[curr]}; `;
      return acc;
    }, "");

    cssVariablesWithMode += `${cssVariables} \n}`;
  });

  setFlushStyles(cssVariablesWithMode);
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

  useSafeLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const documentElement = document.documentElement;

    if (!documentElement) return;
    const head = documentElement.querySelector("head");

    if (!head) return;
    let style = head.querySelector(`[id='${variableStyleTagId}']`);

    if (!style) {
      style = createStyle(variableStyleTagId);
      style.innerHTML = cssVariablesWithMode;
      head.appendChild(style);
    }
  }, []);

  return (
    <OverlayProvider>
      <ToastProvider>{props.children}</ToastProvider>
    </OverlayProvider>
  );
}
