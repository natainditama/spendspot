import React, { createContext, forwardRef, useContext } from "react";
import { Paragraph, styled, YStack } from "tamagui";

type ToastAction = "error" | "warning" | "success" | "info" | "muted";
type ToastVariant = "solid" | "outline";

interface ToastContextValue {
  action: ToastAction;
  variant: ToastVariant;
}

const ToastContext = createContext<ToastContextValue>({
  action: "muted",
  variant: "solid",
});

const ToastFrame = styled(YStack, {
  name: "Toast",
  padding: 16,
  borderRadius: 8,
  gap: 4,
  borderWidth: 1,
  borderColor: "$borderColor",
  backgroundColor: "$background",
  shadowColor: "$shadowColor",
  shadowRadius: 8,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.1,

  variants: {
    action: {
      error: {
        borderColor: "$red10",
      },
      warning: {
        borderColor: "$yellow10",
      },
      success: {
        borderColor: "$green10",
      },
      info: {
        borderColor: "$blue10",
      },
      muted: {
        borderColor: "$borderColor",
      },
    },
    variant: {
      solid: {},
      outline: {
        backgroundColor: "transparent",
      },
    },
  } as const,

  defaultVariants: {
    action: "muted",
    variant: "solid",
  },
});

export interface ToastProps extends React.ComponentPropsWithoutRef<typeof ToastFrame> {
  action?: ToastAction;
  variant?: ToastVariant;
  nativeID?: string;
  className?: string;
}

/** Toast surface container displaying brief transient feedback alerts. */
export const Toast = forwardRef<React.ElementRef<typeof ToastFrame>, ToastProps>(function Toast(
  { action = "muted", variant = "solid", children, ...props },
  ref
) {
  return (
    <ToastContext.Provider value={{ action, variant }}>
      <ToastFrame ref={ref} action={action} variant={variant} role="alert" {...props}>
        {children}
      </ToastFrame>
    </ToastContext.Provider>
  );
});

export interface ToastTitleProps extends Omit<React.ComponentPropsWithoutRef<typeof Paragraph>, "size"> {
  size?: string;
  className?: string;
}

/** Headline title text node inside a Toast alert. */
export const ToastTitle = forwardRef<React.ElementRef<typeof Paragraph>, ToastTitleProps>(function ToastTitle(
  { children, size, ...props },
  ref
) {
  const { action } = useContext(ToastContext);

  let color = "$color";
  if (action === "error") color = "$red10";
  else if (action === "success") color = "$green10";
  else if (action === "warning") color = "$yellow10";
  else if (action === "info") color = "$blue10";

  return (
    <Paragraph ref={ref} fontWeight="600" fontSize={14} color={color as any} {...props}>
      {children}
    </Paragraph>
  );
});

export interface ToastDescriptionProps extends Omit<React.ComponentPropsWithoutRef<typeof Paragraph>, "size"> {
  size?: string;
  className?: string;
}

/** Subdued explanation text node inside a Toast alert. */
export const ToastDescription = forwardRef<React.ElementRef<typeof Paragraph>, ToastDescriptionProps>(
  function ToastDescription({ children, size, ...props }, ref) {
    return (
      <Paragraph ref={ref} fontSize={13} color="$colorHover" {...props}>
        {children}
      </Paragraph>
    );
  }
);

let toastCounter = 0;

export interface ToastOptions {
  id?: string;
  placement?: "top" | "bottom" | "top right" | "top left" | "bottom right" | "bottom left";
  duration?: number;
  render: (props: { id: string }) => React.ReactNode;
}

/** Hook providing programmatic toast dispatching methods. */
export function useToast() {
  return {
    show: (options: ToastOptions) => {
      const id = options.id ?? `toast-${++toastCounter}`;
      return id;
    },
    close: (_id: string) => {
      // Intentional programmatic close handler
    },
  };
}

Toast.displayName = "Toast";
ToastTitle.displayName = "ToastTitle";
ToastDescription.displayName = "ToastDescription";
