"use client";

import React from "react";
import { createAlertDialog } from "@gluestack-ui/core/alert-dialog/creator";
import { tva, useStyleContext, withStyleContext, VariantProps } from "@gluestack-ui/utils/nativewind-utils";
import { Pressable, ScrollView, View } from "react-native";
import Animated, { Easing, FadeIn, FadeOut, ZoomIn } from "react-native-reanimated";

const SCOPE = "ALERT_DIALOG";
const RootComponent = withStyleContext(View, SCOPE);
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedView = Animated.createAnimatedComponent(View);

/**
 * Primitive accessible modal dialog builder tailored for high-priority
 * confirmation prompts. Wires root containers, backdrop pressables, scrollable
 * body wrappers, and action controls.
 */
const UIAccessibleAlertDialog = createAlertDialog({
  Root: RootComponent,
  Body: ScrollView,
  Content: AnimatedView,
  CloseButton: Pressable,
  Header: View,
  Footer: View,
  Backdrop: AnimatedPressable,
});

/**
 * Root container layout variants defining viewport centering and pointer
 * behavior. Centers dialog content on screen while enabling non-blocking
 * pointer events on outer areas.
 */
const alertDialogStyle = tva({
  base: "group/modal w-full h-full justify-center items-center web:pointer-events-none",
  parentVariants: {
    size: {
      xs: "",
      sm: "",
      md: "",
      lg: "",
      full: "",
    },
  },
});

/**
 * Surface card container styles governing dialog boundaries, elevation, and
 * dimensions. Configures responsive width breakpoints ranging from compact xs
 * to full viewport widths.
 */
const alertDialogContentStyle = tva({
  base: "bg-background rounded-lg overflow-hidden border border-border p-6",
  parentVariants: {
    size: {
      xs: "w-[60%] max-w-[360px]",
      sm: "w-[70%] max-w-[420px]",
      md: "w-[80%] max-w-[510px]",
      lg: "w-[90%] max-w-[640px]",
      full: "w-full",
    },
  },
});

/**
 * Interactive button styling for dismissive top-right close affordances. Sets
 * cursor treatments, keyboard focus rings, and touch-target padding.
 */
const alertDialogCloseButtonStyle = tva({
  base: "group/alert-dialog-close-button z-10 rounded-sm p-2 data-[focus-visible=true]:bg-background/10 web:cursor-pointer outline-0",
});

/**
 * Header layout styling organizing the modal title and optional close button.
 * Aligns headline text and controls across a space-between flex container.
 */
const alertDialogHeaderStyle = tva({
  base: "justify-between items-center flex-row",
});

/**
 * Action bar footer layout styling positioning primary and secondary dismissal
 * buttons. Enforces standardized end alignment with predictable gap spacing
 * between actions.
 */
const alertDialogFooterStyle = tva({
  base: "flex-row justify-end items-center gap-3",
});

/**
 * Scrollable content container styling accommodating multi-line explanatory
 * copy. Provides unconstrained flexible scrolling when modal text exceeds
 * device viewports.
 */
const alertDialogBodyStyle = tva({ base: "" });

/**
 * Dimmed overlay backdrop styling obscuring background application surfaces.
 * Positions a semi-opaque scrim covering the entire screen to focus user
 * attention.
 */
const alertDialogBackdropStyle = tva({
  base: "absolute left-0 top-0 right-0 bottom-0 bg-black/50 web:cursor-default",
});

type IAlertDialogProps = React.ComponentPropsWithoutRef<typeof UIAccessibleAlertDialog> &
  VariantProps<typeof alertDialogStyle>;

type IAlertDialogContentProps = React.ComponentPropsWithoutRef<typeof UIAccessibleAlertDialog.Content> &
  VariantProps<typeof alertDialogContentStyle> & { className?: string };

type IAlertDialogCloseButtonProps = React.ComponentPropsWithoutRef<typeof UIAccessibleAlertDialog.CloseButton> &
  VariantProps<typeof alertDialogCloseButtonStyle>;

type IAlertDialogHeaderProps = React.ComponentPropsWithoutRef<typeof UIAccessibleAlertDialog.Header> &
  VariantProps<typeof alertDialogHeaderStyle>;

type IAlertDialogFooterProps = React.ComponentPropsWithoutRef<typeof UIAccessibleAlertDialog.Footer> &
  VariantProps<typeof alertDialogFooterStyle>;

type IAlertDialogBodyProps = React.ComponentPropsWithoutRef<typeof UIAccessibleAlertDialog.Body> &
  VariantProps<typeof alertDialogBodyStyle>;

type IAlertDialogBackdropProps = React.ComponentPropsWithoutRef<typeof UIAccessibleAlertDialog.Backdrop> &
  VariantProps<typeof alertDialogBackdropStyle> & { className?: string };

/**
 * Root alert dialog container managing modal visibility and contextual
 * dimension state. Orchestrates accessibility focus traps and screens readers
 * for destructive confirmations.
 */
const AlertDialog = React.forwardRef<React.ComponentRef<typeof UIAccessibleAlertDialog>, IAlertDialogProps>(
  function AlertDialog({ className, size = "md", ...props }, ref) {
    return (
      <UIAccessibleAlertDialog
        ref={ref}
        {...props}
        className={alertDialogStyle({ class: className })}
        context={{ size }}
        pointerEvents="box-none"
      />
    );
  }
);

/**
 * Animated surface card containing the dialog title, description, and action
 * buttons. Scales in smoothly upon presentation and responds to parent size
 * breakpoint constraints.
 */
const AlertDialogContent = React.forwardRef<
  React.ComponentRef<typeof UIAccessibleAlertDialog.Content>,
  IAlertDialogContentProps
>(function AlertDialogContent({ className, size, ...props }, ref) {
  const { size: parentSize } = useStyleContext(SCOPE);

  return (
    <UIAccessibleAlertDialog.Content
      pointerEvents="auto"
      entering={ZoomIn.duration(200).withInitialValues({
        transform: [{ scale: 0.9 }],
        // opacity: 0,
      })}
      exiting={FadeOut.duration(200)}
      ref={ref}
      {...props}
      className={alertDialogContentStyle({
        parentVariants: {
          size: parentSize,
        },
        size,
        class: className,
      })}
    />
  );
});

/**
 * Dismissive touch target situated in the alert dialog header for rapid
 * cancellation. Provides accessible keyboard focus outlines and subtle hover
 * state highlights.
 */
const AlertDialogCloseButton = React.forwardRef<
  React.ComponentRef<typeof UIAccessibleAlertDialog.CloseButton>,
  IAlertDialogCloseButtonProps
>(function AlertDialogCloseButton({ className, ...props }, ref) {
  return (
    <UIAccessibleAlertDialog.CloseButton
      ref={ref}
      {...props}
      className={alertDialogCloseButtonStyle({
        class: className,
      })}
    />
  );
});

/**
 * Header compartment establishing the semantic title area of the confirmation
 * dialog. Pairs headline typography with optional close affordances in a
 * horizontal layout.
 */
const AlertDialogHeader = React.forwardRef<
  React.ComponentRef<typeof UIAccessibleAlertDialog.Header>,
  IAlertDialogHeaderProps
>(function AlertDialogHeader({ className, ...props }, ref) {
  return (
    <UIAccessibleAlertDialog.Header
      ref={ref}
      {...props}
      className={alertDialogHeaderStyle({
        class: className,
      })}
    />
  );
});

/**
 * Footer action shelf aligning destructive and dismissive control buttons.
 * Groups action triggers with standardized right alignment and consistent item
 * spacing.
 */
const AlertDialogFooter = React.forwardRef<
  React.ComponentRef<typeof UIAccessibleAlertDialog.Footer>,
  IAlertDialogFooterProps
>(function AlertDialogFooter({ className, ...props }, ref) {
  return (
    <UIAccessibleAlertDialog.Footer
      ref={ref}
      {...props}
      className={alertDialogFooterStyle({
        class: className,
      })}
    />
  );
});

/**
 * Primary scrollable text body conveying critical warnings or confirmation
 * details. Ensures lengthy explanatory text remains legible across diverse
 * mobile viewports.
 */
const AlertDialogBody = React.forwardRef<
  React.ComponentRef<typeof UIAccessibleAlertDialog.Body>,
  IAlertDialogBodyProps
>(function AlertDialogBody({ className, ...props }, ref) {
  return (
    <UIAccessibleAlertDialog.Body
      ref={ref}
      {...props}
      className={alertDialogBodyStyle({
        class: className,
      })}
    />
  );
});

/**
 * Semi-transparent backdrop scrim dimming background content behind the active
 * dialog. Fades in gently to create visual depth and signal non-interactive
 * background areas.
 */
const AlertDialogBackdrop = React.forwardRef<
  React.ComponentRef<typeof UIAccessibleAlertDialog.Backdrop>,
  IAlertDialogBackdropProps
>(function AlertDialogBackdrop({ className, ...props }, ref) {
  return (
    <UIAccessibleAlertDialog.Backdrop
      ref={ref}
      {...props}
      entering={FadeIn.duration(200).easing(Easing.linear)}
      exiting={FadeOut.duration(200).easing(Easing.linear)}
      className={alertDialogBackdropStyle({
        class: className,
      })}
    />
  );
});

AlertDialog.displayName = "AlertDialog";
AlertDialogContent.displayName = "AlertDialogContent";
AlertDialogCloseButton.displayName = "AlertDialogCloseButton";
AlertDialogHeader.displayName = "AlertDialogHeader";
AlertDialogFooter.displayName = "AlertDialogFooter";
AlertDialogBody.displayName = "AlertDialogBody";
AlertDialogBackdrop.displayName = "AlertDialogBackdrop";

export {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
};
