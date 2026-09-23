import React, { createContext, forwardRef, useContext } from "react";
import { Modal as RNModal, Pressable } from "react-native";
import { View, XStack, YStack } from "tamagui";

type AlertDialogSize = "xs" | "sm" | "md" | "lg" | "full";

interface AlertDialogContextValue {
  isOpen: boolean;
  onClose?: () => void;
  size: AlertDialogSize;
}

const AlertDialogContext = createContext<AlertDialogContextValue>({
  isOpen: false,
  size: "md",
});

export interface AlertDialogProps {
  isOpen?: boolean;
  onClose?: () => void;
  size?: AlertDialogSize;
  children?: React.ReactNode;
  className?: string;
}

/**
 * Accessible alert dialog prompting users for confirmation before completing
 * critical actions.
 */
export const AlertDialog = forwardRef<any, AlertDialogProps>(function AlertDialog(
  { isOpen = false, onClose, size = "md", children, ...props },
  ref
) {
  if (!isOpen) return null;

  return (
    <AlertDialogContext.Provider value={{ isOpen, onClose, size }}>
      <RNModal visible={isOpen} transparent animationType="fade" onRequestClose={onClose}>
        <View ref={ref} flex={1} alignItems="center" justifyContent="center" padding={16} {...props}>
          {children}
        </View>
      </RNModal>
    </AlertDialogContext.Provider>
  );
});

export interface AlertDialogBackdropProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
}

/**
 * Semi-transparent backdrop scrim dimming background content behind the active
 * alert dialog.
 */
export const AlertDialogBackdrop = forwardRef<any, AlertDialogBackdropProps>(function AlertDialogBackdrop(props, ref) {
  const { onClose } = useContext(AlertDialogContext);

  return (
    <Pressable
      ref={ref}
      style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, backgroundColor: "rgba(0,0,0,0.5)" }}
      onPress={onClose}
      {...props}
    />
  );
});

export interface AlertDialogContentProps extends React.ComponentPropsWithoutRef<typeof YStack> {
  size?: AlertDialogSize;
  className?: string;
}

/**
 * High-priority card surface displaying dialog title, message, and confirmation
 * buttons.
 */
export const AlertDialogContent = forwardRef<React.ElementRef<typeof YStack>, AlertDialogContentProps>(
  function AlertDialogContent({ size: explicitSize, children, ...props }, ref) {
    const context = useContext(AlertDialogContext);
    const size = explicitSize ?? context.size;

    const width =
      size === "xs" ? "70%" : size === "sm" ? "80%" : size === "lg" ? "95%" : size === "full" ? "100%" : "90%";

    const maxWidth = size === "xs" ? 360 : size === "sm" ? 420 : size === "lg" ? 640 : size === "full" ? "100%" : 480;

    return (
      <YStack
        ref={ref}
        width={width as any}
        maxWidth={maxWidth}
        backgroundColor="$background"
        borderRadius={8}
        borderWidth={1}
        borderColor="$borderColor"
        padding={20}
        shadowColor="$shadowColor"
        shadowRadius={20}
        shadowOffset={{ width: 0, height: 8 }}
        shadowOpacity={0.25}
        zIndex={10}
        {...props}
      >
        {children}
      </YStack>
    );
  }
);

export interface AlertDialogHeaderProps extends React.ComponentPropsWithoutRef<typeof XStack> {
  className?: string;
}

/**
 * Header compartment establishing the semantic title area of the confirmation
 * dialog.
 */
export const AlertDialogHeader = forwardRef<React.ElementRef<typeof XStack>, AlertDialogHeaderProps>(
  function AlertDialogHeader({ children, ...props }, ref) {
    return (
      <XStack ref={ref} alignItems="center" justifyContent="space-between" marginBottom={12} {...props}>
        {children}
      </XStack>
    );
  }
);

export interface AlertDialogCloseButtonProps extends React.ComponentPropsWithoutRef<typeof XStack> {
  onPress?: () => void;
  className?: string;
}

/** Dismissive touch target situated in the alert dialog header. */
export const AlertDialogCloseButton = forwardRef<React.ElementRef<typeof XStack>, AlertDialogCloseButtonProps>(
  function AlertDialogCloseButton({ onPress: explicitOnPress, children, ...props }, ref) {
    const { onClose } = useContext(AlertDialogContext);

    return (
      <XStack
        ref={ref}
        padding={4}
        borderRadius={4}
        cursor="pointer"
        pressStyle={{ backgroundColor: "$backgroundHover" }}
        onPress={explicitOnPress ?? onClose}
        alignItems="center"
        justifyContent="center"
        {...props}
      >
        {children}
      </XStack>
    );
  }
);

export interface AlertDialogBodyProps extends React.ComponentPropsWithoutRef<typeof YStack> {
  className?: string;
}

/** Primary text body conveying critical warnings or confirmation details. */
export const AlertDialogBody = forwardRef<React.ElementRef<typeof YStack>, AlertDialogBodyProps>(
  function AlertDialogBody({ children, ...props }, ref) {
    return (
      <YStack ref={ref} marginVertical={8} {...props}>
        {children}
      </YStack>
    );
  }
);

export interface AlertDialogFooterProps extends React.ComponentPropsWithoutRef<typeof XStack> {
  className?: string;
}

/** Footer action shelf aligning destructive and dismissive control buttons. */
export const AlertDialogFooter = forwardRef<React.ElementRef<typeof XStack>, AlertDialogFooterProps>(
  function AlertDialogFooter({ children, ...props }, ref) {
    return (
      <XStack ref={ref} justifyContent="flex-end" alignItems="center" gap={8} marginTop={16} {...props}>
        {children}
      </XStack>
    );
  }
);

AlertDialog.displayName = "AlertDialog";
AlertDialogBackdrop.displayName = "AlertDialogBackdrop";
AlertDialogContent.displayName = "AlertDialogContent";
AlertDialogHeader.displayName = "AlertDialogHeader";
AlertDialogCloseButton.displayName = "AlertDialogCloseButton";
AlertDialogBody.displayName = "AlertDialogBody";
AlertDialogFooter.displayName = "AlertDialogFooter";
