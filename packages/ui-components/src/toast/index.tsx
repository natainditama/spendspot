import {
  Toast as TamaguiToast,
  toast as tamaguiToast,
  Toaster as TamaguiToaster,
  useToastItem as useTamaguiToastItem,
  useToasts as useTamaguiToasts,
} from "@tamagui/toast/v2";
import type { ToastT as TamaguiToastT, ToastType as TamaguiToastType } from "@tamagui/toast/v2";
import React from "react";

export type ToastT = TamaguiToastT;
export type ToastType = TamaguiToastType;
export type ToasterProps = React.ComponentPropsWithoutRef<typeof TamaguiToaster>;

/**
 * Toast notifications container rendering active toast message items and banners.
 * Positions floating feedback banners with automatic dismissal and animation.
 */
export const Toaster = (props: ToasterProps) => {
  return <TamaguiToaster {...props} />;
};
Toaster.displayName = "Toaster";

/**
 * Individual toast notification card showing title, message, and action buttons.
 * Renders elevated floating feedback container with swipe dismissal gestures.
 */
export const Toast = (props: ToastProps) => {
  return <TamaguiToast {...props} />;
};

Toast.displayName = "Toast";
export type ToastProps = React.ComponentPropsWithoutRef<typeof TamaguiToast>;

/**
 * Imperative controller function triggering new toast notifications across the app.
 * Supports title, message, variant type, custom duration, and dismissal callbacks.
 */
export const toast = tamaguiToast;

/**
 * Hook providing access to the current active toast item state and dismiss actions.
 * Used internally by custom toast renderers to access notification metadata.
 */
export const useToastItem = useTamaguiToastItem;

/**
 * Hook subscribing to the global queue of active toast notification messages.
 * Allows components to observe, inspect, and manage toast queues dynamically.
 */
export const useToasts = useTamaguiToasts;
