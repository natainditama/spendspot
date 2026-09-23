import React, { createContext, useContext } from "react";
import { Paragraph, Spinner, styled, XStack, YStack } from "tamagui";

type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
type ButtonSize = "default" | "sm" | "lg" | "icon";

interface ButtonContextValue {
  variant: ButtonVariant;
  size: ButtonSize;
  isDisabled?: boolean;
}

const ButtonContext = createContext<ButtonContextValue>({
  variant: "default",
  size: "default",
  isDisabled: false,
});

const ButtonFrame = styled(XStack, {
  name: "Button",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "row",
  gap: 8,
  userSelect: "none",
  cursor: "pointer",

  variants: {
    variant: {
      default: {
        backgroundColor: "$color",
        pressStyle: { opacity: 0.85 },
      },
      destructive: {
        backgroundColor: "$red10",
        pressStyle: { opacity: 0.85 },
      },
      outline: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "$borderColor",
        pressStyle: { backgroundColor: "$backgroundHover" },
      },
      secondary: {
        backgroundColor: "$backgroundHover",
        pressStyle: { opacity: 0.8 },
      },
      ghost: {
        backgroundColor: "transparent",
        pressStyle: { backgroundColor: "$backgroundHover" },
      },
      link: {
        backgroundColor: "transparent",
        paddingHorizontal: 0,
        pressStyle: { opacity: 0.7 },
      },
    },
    size: {
      default: {
        height: 40,
        paddingHorizontal: 16,
        borderRadius: 6,
      },
      sm: {
        height: 32,
        paddingHorizontal: 12,
        borderRadius: 6,
      },
      lg: {
        height: 48,
        paddingHorizontal: 24,
        borderRadius: 8,
      },
      icon: {
        height: 36,
        width: 36,
        padding: 0,
        borderRadius: 6,
      },
    },
    isDisabled: {
      true: {
        opacity: 0.45,
        pointerEvents: "none",
        cursor: "not-allowed",
      },
    },
  } as const,

  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface ButtonProps extends React.ComponentPropsWithoutRef<typeof ButtonFrame> {
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isDisabled?: boolean;
  disabled?: boolean;
}

/**
 * Primary interactive button component supporting standard SpendSpot variant
 * themes.
 */
export const Button = React.forwardRef<React.ElementRef<typeof ButtonFrame>, ButtonProps>(function Button(
  { variant = "default", size = "default", isDisabled, disabled, children, ...props },
  ref
) {
  const finalDisabled = isDisabled || disabled;
  return (
    <ButtonContext.Provider value={{ variant, size, isDisabled: finalDisabled }}>
      <ButtonFrame
        ref={ref}
        variant={variant}
        size={size}
        isDisabled={finalDisabled}
        accessibilityRole="button"
        accessibilityState={{ disabled: finalDisabled }}
        {...props}
      >
        {children}
      </ButtonFrame>
    </ButtonContext.Provider>
  );
});

export interface ButtonTextProps extends Omit<React.ComponentPropsWithoutRef<typeof Paragraph>, "size"> {
  className?: string;
  size?: ButtonSize;
}

/** Typography label element placed inside a Button container. */
export const ButtonText = React.forwardRef<React.ElementRef<typeof Paragraph>, ButtonTextProps>(function ButtonText(
  { size: explicitSize, children, ...props },
  ref
) {
  const context = useContext(ButtonContext);
  const variant = context.variant;
  const size = explicitSize ?? context.size;

  let color = "$background";
  if (variant === "destructive") {
    color = "#ffffff";
  } else if (variant === "outline" || variant === "secondary" || variant === "ghost") {
    color = "$color";
  } else if (variant === "link") {
    color = "$blue10";
  }

  const fontSize = size === "sm" ? 13 : size === "lg" ? 16 : 14;

  return (
    <Paragraph
      ref={ref}
      color={color as any}
      fontSize={fontSize}
      fontWeight="600"
      textDecorationLine={variant === "link" ? "underline" : "none"}
      userSelect="none"
      {...props}
    >
      {children}
    </Paragraph>
  );
});

export interface ButtonIconProps {
  as?: React.ElementType;
  size?: number | string;
  height?: number;
  width?: number;
  color?: string;
  className?: string;
  [key: string]: any;
}

/**
 * Icon container element coordinating dimensions and colors with parent button
 * variants.
 */
export const ButtonIcon = React.forwardRef<any, ButtonIconProps>(function ButtonIcon(
  { as: Component, size, height, width, color: explicitColor, ...props },
  ref
) {
  const context = useContext(ButtonContext);
  const variant = context.variant;
  const btnSize = context.size;

  let color = explicitColor;
  if (!color) {
    if (variant === "default") {
      color = "white";
    } else if (variant === "destructive") {
      color = "white";
    } else if (variant === "outline" || variant === "secondary" || variant === "ghost") {
      color = "currentColor";
    } else if (variant === "link") {
      color = "#3b82f6";
    }
  }

  const iconDimension =
    size !== undefined
      ? typeof size === "number"
        ? size
        : parseInt(size as string, 10)
      : height !== undefined
        ? height
        : btnSize === "sm"
          ? 14
          : btnSize === "lg"
            ? 20
            : 16;

  if (Component) {
    return (
      <Component ref={ref} size={iconDimension} width={iconDimension} height={iconDimension} color={color} {...props} />
    );
  }

  return null;
});

export interface ButtonSpinnerProps {
  color?: string;
  className?: string;
}

/** Loading spinner component coordinating appearance with parent button sizing. */
export const ButtonSpinner = React.forwardRef<React.ElementRef<typeof Spinner>, ButtonSpinnerProps>(
  function ButtonSpinner({ color: explicitColor, ...props }, ref) {
    const context = useContext(ButtonContext);
    const variant = context.variant;

    let color = explicitColor;
    if (!color) {
      color = variant === "default" || variant === "destructive" ? "white" : undefined;
    }

    return <Spinner ref={ref} size="small" color={color as any} {...props} />;
  }
);

const SPACES: Record<string, number> = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 28,
  "4xl": 32,
};

export interface ButtonGroupProps {
  className?: string;
  space?: keyof typeof SPACES;
  isAttached?: boolean;
  flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";
  children?: React.ReactNode;
}

/** Layout group organizing multiple adjacent buttons with configurable spacing. */
export const ButtonGroup = React.forwardRef<any, ButtonGroupProps>(function ButtonGroup(
  { space = "md", isAttached = false, flexDirection = "row", children, ...props },
  ref
) {
  const gap = isAttached ? 0 : (SPACES[space] ?? 12);
  const isCol = flexDirection === "column" || flexDirection === "column-reverse";
  const Container = isCol ? YStack : XStack;

  return (
    <Container ref={ref} gap={gap} flexDirection={flexDirection} {...props}>
      {children}
    </Container>
  );
});

Button.displayName = "Button";
ButtonText.displayName = "ButtonText";
ButtonIcon.displayName = "ButtonIcon";
ButtonSpinner.displayName = "ButtonSpinner";
ButtonGroup.displayName = "ButtonGroup";
