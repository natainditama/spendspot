import { GetProps } from "@tamagui/core";
import { X } from "@tamagui/lucide-icons-2";
import { XStack, YStack } from "@tamagui/stacks";
import {
  Toast as TamaguiToast,
  toast as tamaguiToast,
  useToastItem as useTamaguiToastItem,
  useToasts as useTamaguiToasts,
} from "@tamagui/toast/v2";
import type {
  ExternalToast,
  PromiseData,
  PromiseT,
  SwipeDirection,
  ToasterProps as TamaguiToasterProps,
  ToastItemProps as TamaguiToastItemProps,
  ToastListProps as TamaguiToastListProps,
  ToastViewportProps as TamaguiToastViewportProps,
  ToasterPosition,
  ToastIcons,
  ToastItemRenderProps,
  ToastPosition,
  ToastRootProps,
  ToastT,
  ToastToDismiss,
  ToastType,
} from "@tamagui/toast/v2";
import React from "react";

/**
 * Viewport container surface hosting floating toast items above the application hierarchy.
 * Manages screen edge offsets, keyboard hotkeys, and accessibility notification portals.
 */
export const ToastViewport = (props: ToastViewportProps) => {
  return <TamaguiToast.Viewport {...props} />;
};

ToastViewport.displayName = "ToastViewport";
export type ToastViewportProps = TamaguiToastViewportProps;

/**
 * Animated list renderer orchestrating the entry, exit, and stacking order of active toasts.
 * Supports customizable item render callbacks for application-specific toast templates.
 */
export const ToastList = (props: ToastListProps) => {
  return <TamaguiToast.List {...props} />;
};

ToastList.displayName = "ToastList";
export type ToastListProps = TamaguiToastListProps;

/**
 * Individual toast item card container rendering notification feedback and dismiss gestures.
 * Handles swipe-to-dismiss interactions, elevation shadows, and theme styling tokens.
 */
export const ToastItem = (props: ToastItemProps) => {
  return <TamaguiToast.Item {...props} />;
};

TamaguiToast.displayName = "ToastItem";
export type ToastItemProps = TamaguiToastItemProps;

/**
 * Primary title typography component rendered within a toast notification card.
 * Formatted with unified semantic color tokens and bold font weighting.
 */
export const ToastTitle = (props: GetProps<typeof TamaguiToast.Title>) => {
  return <TamaguiToast.Title {...props} />;
};

ToastTitle.displayName = "ToastTitle";
export type ToastTitleProps = GetProps<typeof TamaguiToast.Title>;

/**
 * Secondary descriptive body typography component rendered within a toast notification card.
 * Uses muted foreground typography tokens for supplementary feedback details.
 */
export const ToastDescription = (props: GetProps<typeof TamaguiToast.Description>) => {
  return <TamaguiToast.Description {...props} />;
};

ToastDescription.displayName = "ToastDescription";
export type ToastDescriptionProps = GetProps<typeof TamaguiToast.Description>;

/**
 * Interactive close button triggering immediate dismissal of the enclosing toast notification.
 * Coordinates hover, press feedback, and accessible click actions.
 */
export const ToastClose = (props: GetProps<typeof TamaguiToast.Close>) => {
  return <TamaguiToast.Close {...props} />;
};

ToastClose.displayName = "ToastClose";
export type ToastCloseProps = GetProps<typeof TamaguiToast.Close>;

/**
 * Interactive call-to-action button rendered within a toast notification card.
 * Executes user confirmation or retry actions with theme feedback styling.
 */
export const ToastAction = (props: GetProps<typeof TamaguiToast.Action>) => {
  return <TamaguiToast.Action {...props} />;
};

ToastAction.displayName = "ToastAction";
export type ToastActionProps = GetProps<typeof TamaguiToast.Action>;

/**
 * Status indicator icon component displaying semantic feedback icons according to toast variant.
 * Automatically reflects success, error, warning, info, and loading states.
 */
export const ToastIcon = (props: GetProps<typeof TamaguiToast.Icon>) => {
  return <TamaguiToast.Icon {...props} />;
};

ToastIcon.displayName = "ToastIcon";
export type ToastIconProps = GetProps<typeof TamaguiToast.Icon>;

/**
 * Hook providing access to the current toast item context, data, and dismissal handler.
 * Enables custom toast templates to bind actions and dismissal logic directly.
 */
export const useToastItem = useTamaguiToastItem;

/**
 * Hook exposing the active list of toast notifications and global stack state.
 * Returns array of active toasts, expanded state, and screen viewport position.
 */
export const useToasts = useTamaguiToasts;

/**
 * Imperative controller function triggering new toast notifications across the app.
 * Supports title, description, variant type, custom duration, and dismissal callbacks.
 */
export const toast = tamaguiToast;

/**
 * Root container coordinating toast message notifications and viewport position.
 * Supports composable Toast.Viewport, Toast.List, Toast.Item, Toast.Title architecture.
 */
export const Toast = (props: GetProps<typeof TamaguiToast>) => {
  return <TamaguiToast {...props} />;
};

Toast.displayName = "Toast";
export type ToastProps = GetProps<typeof TamaguiToast>;

/**
 * All-in-one drop-in toast notifications component styled with SpendSpot tokens.
 * Renders Toast.Viewport and Toast.List with automatic positioning and animations.
 */
export const Toaster = ({
  position = "bottom-center",
  duration = 4000,
  swipeDirection = "auto",
  portalToRoot = false,
  portalZIndex = 100000,
  renderItem,
  ...props
}: ToasterProps) => {
  return (
    <TamaguiToast position={position} duration={duration} swipeDirection={swipeDirection} {...props}>
      <TamaguiToast.Viewport portalToRoot={portalToRoot} portalZIndex={portalZIndex} offset={24}>
        <TamaguiToast.List
          renderItem={
            renderItem ??
            (({ toast: item, index, handleClose }) => {
              const title = typeof item.title === "function" ? item.title() : item.title;
              const description = typeof item.description === "function" ? item.description() : item.description;

              return (
                <TamaguiToast.Item
                  toast={item}
                  index={index}
                  backgroundColor="$card"
                  borderColor="$border"
                  borderWidth="$px"
                  borderRadius="$lg"
                  padding="$3.5"
                  elevation={0}
                  shadowColor="rgba(0, 0, 0, 0.1)"
                  shadowOffset={{ width: 0, height: 4 }}
                  shadowRadius={12}
                  width="100%"
                  maxWidth={420}
                >
                  <XStack alignItems="flex-start" gap="$3" width="100%">
                    <TamaguiToast.Icon />
                    <YStack flex={1} gap="$1">
                      {title ? (
                        <TamaguiToast.Title color="$foreground" fontSize="$sm" fontWeight="600">
                          {title}
                        </TamaguiToast.Title>
                      ) : null}
                      {description ? (
                        <TamaguiToast.Description color="$mutedForeground" fontSize="$xs">
                          {description}
                        </TamaguiToast.Description>
                      ) : null}
                    </YStack>
                    <TamaguiToast.Close
                      onPress={handleClose}
                      padding="$1"
                      cursor="pointer"
                      pressStyle={{ opacity: 0.7 }}
                      backgroundColor="transparent"
                      borderWidth={0}
                    >
                      <X size="$3.5" color="$mutedForeground" />
                    </TamaguiToast.Close>
                  </XStack>
                </TamaguiToast.Item>
              );
            })
          }
        />
      </TamaguiToast.Viewport>
    </TamaguiToast>
  );
};

Toaster.displayName = "Toaster";
export interface ToasterProps extends TamaguiToasterProps {
  portalToRoot?: boolean;
  portalZIndex?: number;
  renderItem?: TamaguiToastListProps["renderItem"];
}

export type {
  ExternalToast,
  PromiseData,
  PromiseT,
  SwipeDirection,
  ToastIcons,
  ToastItemRenderProps,
  ToastPosition,
  ToastRootProps,
  ToastT,
  ToastToDismiss,
  ToastType,
  ToasterPosition,
};
