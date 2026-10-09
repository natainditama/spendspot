import { AlertDialog as TamaguiAlertDialog } from "@tamagui/alert-dialog";
import type { AlertDialogProps as TamaguiAlertDialogProps } from "@tamagui/alert-dialog";
import { styled, withStaticProperties } from "@tamagui/core";
import type { GetProps } from "@tamagui/core";
import { XStack, YStack } from "@tamagui/stacks";
import React from "react";

/**
 * Root container for coordinating modal confirmation dialogs requiring explicit user action.
 * Manages modal visibility, portal attachment, and keyboard accessibility.
 */
export const AlertDialogRoot = ({ children, ...props }: TamaguiAlertDialogProps) => {
  return <TamaguiAlertDialog {...props}>{children}</TamaguiAlertDialog>;
};

AlertDialogRoot.displayName = "AlertDialog";
export type AlertDialogRootProps = React.ComponentPropsWithoutRef<typeof TamaguiAlertDialog>;

/**
 * Trigger button opening the associated AlertDialog on press interaction.
 * Inherits standard interactive button behaviors without default visual styling.
 */
export const AlertDialogTrigger = ({ children, ...props }: AlertDialogTriggerProps) => {
  return <TamaguiAlertDialog.Trigger {...props}>{children}</TamaguiAlertDialog.Trigger>;
};

AlertDialogTrigger.displayName = "AlertDialogTrigger";
export type AlertDialogTriggerProps = React.ComponentPropsWithoutRef<typeof TamaguiAlertDialog.Trigger>;

/**
 * Portals dialog overlay and content to the root level of the application hierarchy.
 * Ensures modal displays above all sibling screens and views without z-index clipping.
 */
export const AlertDialogPortal = ({ children, ...props }: AlertDialogPortalProps) => {
  return <TamaguiAlertDialog.Portal {...props}>{children}</TamaguiAlertDialog.Portal>;
};

AlertDialogPortal.displayName = "AlertDialogPortal";
export type AlertDialogPortalProps = React.ComponentPropsWithoutRef<typeof TamaguiAlertDialog.Portal>;

/**
 * Dimmed semi-transparent backdrop behind modal dialog content.
 * Prevents outside touches and emphasizes focus on confirmation actions.
 */
export const AlertDialogOverlay = ({ children, ...props }: AlertDialogOverlayProps) => {
  return (
    <TamaguiAlertDialog.Overlay
      backgroundColor="$overlay"
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      {...props}
    >
      {children}
    </TamaguiAlertDialog.Overlay>
  );
};

AlertDialogOverlay.displayName = "AlertDialogOverlay";
export type AlertDialogOverlayProps = GetProps<typeof TamaguiAlertDialog.Overlay>;

const AlertDialogContentFrame = styled(TamaguiAlertDialog.Content, {
  name: "AlertDialogContent",
  backgroundColor: "$popover",
  borderRadius: "$xl",
  borderWidth: "$px",
  borderColor: "$border",
  padding: "$4",
  gap: "$4",
  width: "100%",
  maxWidth: "$80",
  elevation: "$4",
  alignSelf: "center",
  zIndex: 500,

  variants: {
    size: {
      default: {
        maxWidth: "$80",
      },
      sm: {
        maxWidth: "$64",
      },
    },
  } as const,

  defaultVariants: {
    size: "default",
  },
});
AlertDialogContentFrame.displayName = "AlertDialogContent";

/**
 * Card container rendering dialog content, header, description, and footer buttons.
 * Styled after shadcn UI alert dialog specification with rounded borders and elevated shadows.
 */
export const AlertDialogContent = ({ children, ...props }: AlertDialogContentProps) => {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogContentFrame {...props}>{children}</AlertDialogContentFrame>
    </AlertDialogPortal>
  );
};

AlertDialogContent.displayName = "AlertDialogContent";
export type AlertDialogContentProps = GetProps<typeof AlertDialogContentFrame>;

/**
 * Vertical header stack grouping dialog icon, title, and descriptive summary text.
 * Centers content on mobile screens for balanced visual presentation.
 */
export const AlertDialogHeader = styled(YStack, {
  name: "AlertDialogHeader",
  gap: "$1.5",
  alignItems: "center",
  width: "100%",
});

AlertDialogHeader.displayName = "AlertDialogHeader";
export type AlertDialogHeaderProps = GetProps<typeof AlertDialogHeader>;

/**
 * Action footer organizing confirmation and cancel buttons in responsive order.
 * Arranges action buttons with standardized token spacing.
 */
export const AlertDialogFooter = styled(YStack, {
  name: "AlertDialogFooter",
  gap: "$2",
  marginTop: "$2",
  width: "100%",
});

AlertDialogFooter.displayName = "AlertDialogFooter";
export type AlertDialogFooterProps = GetProps<typeof AlertDialogFooter>;

/**
 * Media slot for displaying contextual icons or illustrations above dialog titles.
 * Renders centered content within a rounded muted background frame.
 */
export const AlertDialogMedia = styled(XStack, {
  name: "AlertDialogMedia",
  width: "$10",
  height: "$10",
  borderRadius: "$md",
  backgroundColor: "$muted",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "$2",
});

AlertDialogMedia.displayName = "AlertDialogMedia";
export type AlertDialogMediaProps = GetProps<typeof AlertDialogMedia>;

/**
 * Prominent heading label summarizing the critical decision or action required.
 * Styled with foreground color, base font size, and semi-bold typography weight.
 */
export const AlertDialogTitle = styled(TamaguiAlertDialog.Title, {
  name: "AlertDialogTitle",
  fontSize: "$base",
  lineHeight: "$base",
  fontWeight: "600",
  color: "$foreground",
  textAlign: "center",
});

AlertDialogTitle.displayName = "AlertDialogTitle";
export type AlertDialogTitleProps = GetProps<typeof AlertDialogTitle>;

/**
 * Secondary body text explaining the consequences of confirming the alert dialog.
 * Styled with muted-foreground color and standard body text typography.
 */
export const AlertDialogDescription = styled(TamaguiAlertDialog.Description, {
  name: "AlertDialogDescription",
  fontSize: "$sm",
  lineHeight: "$sm",
  color: "$mutedForeground",
  textAlign: "center",
});

AlertDialogDescription.displayName = "AlertDialogDescription";
export type AlertDialogDescriptionProps = GetProps<typeof AlertDialogDescription>;

/**
 * Primary confirmation button triggering destructive or required actions.
 * Wraps trigger element and automatically executes confirmation callbacks.
 */
export const AlertDialogAction = ({ children, ...props }: AlertDialogActionProps) => {
  return <TamaguiAlertDialog.Action {...props}>{children}</TamaguiAlertDialog.Action>;
};

AlertDialogAction.displayName = "AlertDialogAction";
export type AlertDialogActionProps = React.ComponentPropsWithoutRef<typeof TamaguiAlertDialog.Action>;

/**
 * Secondary dismissal button closing the dialog without executing pending actions.
 * Resets alert dialog state and returns user to the previous context.
 */
export const AlertDialogCancel = ({ children, ...props }: AlertDialogCancelProps) => {
  return <TamaguiAlertDialog.Cancel {...props}>{children}</TamaguiAlertDialog.Cancel>;
};

AlertDialogCancel.displayName = "AlertDialogCancel";
export type AlertDialogCancelProps = React.ComponentPropsWithoutRef<typeof TamaguiAlertDialog.Cancel>;

/**
 * Composite AlertDialog component coordinating modal confirmation flows.
 * Supports compound syntax as well as flat individual named sub-component exports.
 */
export const AlertDialog = withStaticProperties(AlertDialogRoot, {
  Trigger: AlertDialogTrigger,
  Portal: AlertDialogPortal,
  Overlay: AlertDialogOverlay,
  Content: AlertDialogContent,
  Header: AlertDialogHeader,
  Footer: AlertDialogFooter,
  Media: AlertDialogMedia,
  Title: AlertDialogTitle,
  Description: AlertDialogDescription,
  Action: AlertDialogAction,
  Cancel: AlertDialogCancel,
});

AlertDialog.displayName = "AlertDialog";
export type AlertDialogProps = TamaguiAlertDialogProps;
