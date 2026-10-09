import { styled, withStaticProperties } from "@tamagui/core";
import type { GetProps } from "@tamagui/core";
import { Dialog as TamaguiDialog } from "@tamagui/dialog";
import type { DialogProps as TamaguiDialogProps } from "@tamagui/dialog";
import { X } from "@tamagui/lucide-icons-2";
import { YStack } from "@tamagui/stacks";
import React from "react";

import { Button } from "../button";

/**
 * Root container managing modal dialog state, transitions, and focus traps.
 * Supports modal visibility, portal rendering, and interactive triggers.
 */
export const DialogRoot = ({ children, ...props }: DialogProps) => {
  return <TamaguiDialog {...props}>{children}</TamaguiDialog>;
};

DialogRoot.displayName = "Dialog";
export type DialogRootProps = GetProps<typeof DialogRoot>;

/**
 * Button or interactive element that toggles the associated Dialog open.
 * Unstyled wrapper delegating click and press events to dialog state.
 */
export const DialogTrigger = ({ children, ...props }: DialogTriggerProps) => {
  return <TamaguiDialog.Trigger {...props}>{children}</TamaguiDialog.Trigger>;
};

DialogTrigger.displayName = "DialogTrigger";
export type DialogTriggerProps = React.ComponentPropsWithoutRef<typeof TamaguiDialog.Trigger>;

/**
 * Renders dialog content and overlays into the application root portal container.
 * Prevents z-index collisions and clipping by parent overflow rules.
 */
export const DialogPortal = ({ children, ...props }: DialogPortalProps) => {
  return <TamaguiDialog.Portal {...props}>{children}</TamaguiDialog.Portal>;
};

DialogPortal.displayName = "DialogPortal";
export type DialogPortalProps = React.ComponentPropsWithoutRef<typeof TamaguiDialog.Portal>;

/**
 * Backdrop overlay dimming underlying page content when the dialog is open.
 * Absorbs outside touch events according to modal dismissal configuration.
 */
export const DialogOverlay = ({ children, ...props }: DialogOverlayProps) => {
  return (
    <TamaguiDialog.Overlay
      backgroundColor="$overlay"
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      {...props}
    >
      {children}
    </TamaguiDialog.Overlay>
  );
};

DialogOverlay.displayName = "DialogOverlay";
export type DialogOverlayProps = GetProps<typeof TamaguiDialog.Overlay>;

const DialogContentFrame = styled(TamaguiDialog.Content, {
  name: "DialogContent",
  backgroundColor: "$background",
  borderRadius: "$xl",
  borderWidth: "$px",
  borderColor: "$border",
  padding: "$4",
  gap: "$3",
  width: "100%",
  maxWidth: "$80",
  elevation: "$4",
  alignSelf: "center",
  position: "relative",
});
DialogContentFrame.displayName = "DialogContent";

/**
 * Modal content window displaying headers, descriptions, custom forms, and actions.
 * Automatically bundles portal and overlay attachments with optional close button.
 */
export const DialogContent = ({ children, showCloseButton = true, ...props }: DialogContentProps) => {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogContentFrame {...props}>
        {children}
        {showCloseButton && (
          <DialogClose asChild>
            <Button variant="ghost" buttonSize="icon-xs" position="absolute" top="$3" right="$3">
              <X size="$4" color="$mutedForeground" />
            </Button>
          </DialogClose>
        )}
      </DialogContentFrame>
    </DialogPortal>
  );
};

DialogContent.displayName = "DialogContent";
export type DialogContentProps = GetProps<typeof DialogContentFrame> & {
  showCloseButton?: boolean;
};

/**
 * Header section at the top of the dialog containing title and description.
 * Organizes headings with standardized vertical gap spacing.
 */
export const DialogHeader = styled(YStack, {
  name: "DialogHeader",
  gap: "$1.5",
  width: "100%",
});

DialogHeader.displayName = "DialogHeader";
export type DialogHeaderProps = GetProps<typeof DialogHeader>;

/**
 * Footer area at the bottom of the dialog for action and dismissal buttons.
 * Stacks buttons responsive to screen dimensions with standardized gap.
 */
export const DialogFooter = styled(YStack, {
  name: "DialogFooter",
  gap: "$2",
  marginTop: "$2",
  width: "100%",
});

DialogFooter.displayName = "DialogFooter";
export type DialogFooterProps = GetProps<typeof DialogFooter>;

/**
 * Primary title text identifying the purpose or content of the modal dialog.
 * Styled with bold foreground typography matching shadcn specifications.
 */
export const DialogTitle = styled(TamaguiDialog.Title, {
  name: "DialogTitle",
  fontSize: "$base",
  lineHeight: "$base",
  fontWeight: "600",
  color: "$foreground",
});

DialogTitle.displayName = "DialogTitle";
export type DialogTitleProps = GetProps<typeof DialogTitle>;

/**
 * Descriptive paragraph providing supplementary details within the dialog header.
 * Rendered with muted-foreground color and standard body text typography.
 */
export const DialogDescription = styled(TamaguiDialog.Description, {
  name: "DialogDescription",
  fontSize: "$sm",
  lineHeight: "$sm",
  color: "$mutedForeground",
});

DialogDescription.displayName = "DialogDescription";
export type DialogDescriptionProps = GetProps<typeof DialogDescription>;

/**
 * Button or pressable child that dismisses the currently active Dialog.
 * Closes modal window and restores focus to the original triggering element.
 */
export const DialogClose = ({ children, ...props }: DialogCloseProps) => {
  return <TamaguiDialog.Close {...props}>{children}</TamaguiDialog.Close>;
};

DialogClose.displayName = "DialogClose";
export type DialogCloseProps = React.ComponentPropsWithoutRef<typeof TamaguiDialog.Close>;

/**
 * Composite Dialog component coordinating modal dialog windows and overlays.
 * Supports compound syntax as well as flat individual named sub-component exports.
 */
export const Dialog = withStaticProperties(DialogRoot, {
  Trigger: DialogTrigger,
  Portal: DialogPortal,
  Close: DialogClose,
  Overlay: DialogOverlay,
  Content: DialogContent,
  Header: DialogHeader,
  Footer: DialogFooter,
  Title: DialogTitle,
  Description: DialogDescription,
});

Dialog.displayName = "Dialog";
export type DialogProps = TamaguiDialogProps;
