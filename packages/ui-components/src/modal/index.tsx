import React, { createContext, forwardRef, useContext } from "react";
import { Modal as RNModal, Pressable } from "react-native";
import { View, XStack, YStack } from "tamagui";

type ModalSize = "xs" | "sm" | "md" | "lg" | "full";

interface ModalContextValue {
  isOpen: boolean;
  onClose?: () => void;
  size: ModalSize;
}

const ModalContext = createContext<ModalContextValue>({
  isOpen: false,
  size: "md",
});

export interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  size?: ModalSize;
  children?: React.ReactNode;
  className?: string;
}

/** Centered modal dialog presenting focused tasks or critical interactions. */
export const Modal = forwardRef<any, ModalProps>(function Modal(
  { isOpen = false, onClose, size = "md", children, ...props },
  ref
) {
  if (!isOpen) return null;

  return (
    <ModalContext.Provider value={{ isOpen, onClose, size }}>
      <RNModal visible={isOpen} transparent animationType="fade" onRequestClose={onClose}>
        <View ref={ref} flex={1} alignItems="center" justifyContent="center" padding={16} {...props}>
          {children}
        </View>
      </RNModal>
    </ModalContext.Provider>
  );
});

export interface ModalBackdropProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
}

/** Dimmed backdrop capturing outside clicks to dismiss the active modal. */
export const ModalBackdrop = forwardRef<any, ModalBackdropProps>(function ModalBackdrop(props, ref) {
  const { onClose } = useContext(ModalContext);

  return (
    <Pressable
      ref={ref}
      style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, backgroundColor: "rgba(0,0,0,0.5)" }}
      onPress={onClose}
      {...props}
    />
  );
});

export interface ModalContentProps extends React.ComponentPropsWithoutRef<typeof YStack> {
  size?: ModalSize;
  className?: string;
}

/**
 * Elevated surface card containing modal header, body content, and footer
 * actions.
 */
export const ModalContent = forwardRef<React.ElementRef<typeof YStack>, ModalContentProps>(function ModalContent(
  { size: explicitSize, children, ...props },
  ref
) {
  const context = useContext(ModalContext);
  const size = explicitSize ?? context.size;

  const width =
    size === "xs" ? "70%" : size === "sm" ? "80%" : size === "lg" ? "95%" : size === "full" ? "100%" : "90%";

  const maxWidth = size === "xs" ? 360 : size === "sm" ? 420 : size === "lg" ? 640 : size === "full" ? "100%" : 520;

  return (
    <YStack
      ref={ref}
      width={width as any}
      maxWidth={maxWidth}
      backgroundColor="$background"
      borderRadius={8}
      borderWidth={1}
      borderColor="$borderColor"
      padding={16}
      shadowColor="$shadowColor"
      shadowRadius={16}
      shadowOffset={{ width: 0, height: 6 }}
      shadowOpacity={0.2}
      zIndex={10}
      {...props}
    >
      {children}
    </YStack>
  );
});

export interface ModalHeaderProps extends React.ComponentPropsWithoutRef<typeof XStack> {
  className?: string;
}

/** Header compartment organizing modal title and close triggers. */
export const ModalHeader = forwardRef<React.ElementRef<typeof XStack>, ModalHeaderProps>(function ModalHeader(
  { children, ...props },
  ref
) {
  return (
    <XStack ref={ref} alignItems="center" justifyContent="space-between" marginBottom={12} {...props}>
      {children}
    </XStack>
  );
});

export interface ModalCloseButtonProps extends React.ComponentPropsWithoutRef<typeof XStack> {
  onPress?: () => void;
  className?: string;
}

/** Dismiss button located at the top-right corner of a modal dialog. */
export const ModalCloseButton = forwardRef<React.ElementRef<typeof XStack>, ModalCloseButtonProps>(
  function ModalCloseButton({ onPress: explicitOnPress, children, ...props }, ref) {
    const { onClose } = useContext(ModalContext);

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

export interface ModalBodyProps extends React.ComponentPropsWithoutRef<typeof YStack> {
  className?: string;
}

/** Scrollable or flexible content area inside the modal container. */
export const ModalBody = forwardRef<React.ElementRef<typeof YStack>, ModalBodyProps>(function ModalBody(
  { children, ...props },
  ref
) {
  return (
    <YStack ref={ref} marginVertical={8} {...props}>
      {children}
    </YStack>
  );
});

export interface ModalFooterProps extends React.ComponentPropsWithoutRef<typeof XStack> {
  className?: string;
}

/** Bottom action shelf aligning primary and secondary dialog buttons. */
export const ModalFooter = forwardRef<React.ElementRef<typeof XStack>, ModalFooterProps>(function ModalFooter(
  { children, ...props },
  ref
) {
  return (
    <XStack ref={ref} justifyContent="flex-end" alignItems="center" gap={8} marginTop={16} {...props}>
      {children}
    </XStack>
  );
});

Modal.displayName = "Modal";
ModalBackdrop.displayName = "ModalBackdrop";
ModalContent.displayName = "ModalContent";
ModalHeader.displayName = "ModalHeader";
ModalCloseButton.displayName = "ModalCloseButton";
ModalBody.displayName = "ModalBody";
ModalFooter.displayName = "ModalFooter";
