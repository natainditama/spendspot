import React, { createContext, forwardRef, useContext } from "react";
import { Paragraph, styled, XStack } from "tamagui";

type AlertVariant = "default" | "destructive";

interface AlertContextValue {
  variant: AlertVariant;
}

const AlertContext = createContext<AlertContextValue>({
  variant: "default",
});

const AlertFrame = styled(XStack, {
  name: "Alert",
  borderRadius: 8,
  borderWidth: 1,
  padding: 12,
  alignItems: "flex-start",
  gap: 8,
  width: "100%",

  variants: {
    variant: {
      default: {
        backgroundColor: "$backgroundHover",
        borderColor: "$borderColor",
      },
      destructive: {
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        borderColor: "$red10",
      },
    },
  } as const,

  defaultVariants: {
    variant: "default",
  },
});

export interface AlertProps extends React.ComponentPropsWithoutRef<typeof AlertFrame> {
  variant?: AlertVariant;
  className?: string;
}

/** Visual feedback callout presenting system alerts and status banners. */
export const Alert = forwardRef<React.ElementRef<typeof AlertFrame>, AlertProps>(function Alert(
  { variant = "default", children, ...props },
  ref
) {
  return (
    <AlertContext.Provider value={{ variant }}>
      <AlertFrame ref={ref} variant={variant} role="alert" {...props}>
        {children}
      </AlertFrame>
    </AlertContext.Provider>
  );
});

export interface AlertTextProps extends React.ComponentPropsWithoutRef<typeof Paragraph> {
  className?: string;
}

/** Text node displaying the primary descriptive message in an alert. */
export const AlertText = forwardRef<React.ElementRef<typeof Paragraph>, AlertTextProps>(function AlertText(
  { children, ...props },
  ref
) {
  const { variant } = useContext(AlertContext);

  return (
    <Paragraph
      ref={ref}
      fontSize={13}
      fontWeight="500"
      color={variant === "destructive" ? "$red10" : "$color"}
      flex={1}
      {...props}
    >
      {children}
    </Paragraph>
  );
});

export interface AlertIconProps {
  as?: React.ElementType;
  size?: number | string;
  height?: number;
  width?: number;
  color?: string;
  className?: string;
  [key: string]: any;
}

/** Status indicator icon displayed alongside alert text. */
export const AlertIcon = forwardRef<any, AlertIconProps>(function AlertIcon(
  { as: Component, size = 16, height, width, color: explicitColor, ...props },
  ref
) {
  const { variant } = useContext(AlertContext);
  const color = explicitColor ?? (variant === "destructive" ? "#ef4444" : undefined);
  const dim = height ?? width ?? (typeof size === "number" ? size : 16);

  if (Component) {
    return <Component ref={ref} size={dim} width={dim} height={dim} color={color} {...props} />;
  }
  return null;
});

Alert.displayName = "Alert";
AlertText.displayName = "AlertText";
AlertIcon.displayName = "AlertIcon";
