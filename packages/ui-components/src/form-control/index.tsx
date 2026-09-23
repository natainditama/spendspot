import React, { createContext, forwardRef, useContext } from "react";
import { Paragraph, XStack, YStack } from "tamagui";

interface FormControlContextValue {
  isInvalid?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
}

const FormControlContext = createContext<FormControlContextValue>({
  isInvalid: false,
  isRequired: false,
  isDisabled: false,
  isReadOnly: false,
});

export interface FormControlProps extends React.ComponentPropsWithoutRef<typeof YStack> {
  isInvalid?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  className?: string;
}

/**
 * Contextual container managing accessible form control states and validation
 * feedback.
 */
export const FormControl = forwardRef<React.ElementRef<typeof YStack>, FormControlProps>(function FormControl(
  { isInvalid = false, isRequired = false, isDisabled = false, isReadOnly = false, children, ...props },
  ref
) {
  return (
    <FormControlContext.Provider value={{ isInvalid, isRequired, isDisabled, isReadOnly }}>
      <YStack ref={ref} gap={4} width="100%" {...props}>
        {children}
      </YStack>
    </FormControlContext.Provider>
  );
});

export interface FormControlLabelProps extends React.ComponentPropsWithoutRef<typeof XStack> {
  className?: string;
}

/** Layout container wrapping form field title and required asterisks. */
export const FormControlLabel = forwardRef<React.ElementRef<typeof XStack>, FormControlLabelProps>(
  function FormControlLabel({ children, ...props }, ref) {
    return (
      <XStack ref={ref} alignItems="center" gap={4} marginBottom={2} {...props}>
        {children}
      </XStack>
    );
  }
);

export interface FormControlLabelTextProps extends React.ComponentPropsWithoutRef<typeof Paragraph> {
  className?: string;
}

/** Text node displaying the descriptive label of an input field. */
export const FormControlLabelText = forwardRef<React.ElementRef<typeof Paragraph>, FormControlLabelTextProps>(
  function FormControlLabelText({ children, ...props }, ref) {
    return (
      <Paragraph ref={ref} fontSize={14} fontWeight="500" color="$color" {...props}>
        {children}
      </Paragraph>
    );
  }
);

export interface FormControlLabelAstrickProps extends React.ComponentPropsWithoutRef<typeof Paragraph> {
  className?: string;
}

/** Mandatory asterisk symbol indicating a required form field. */
export const FormControlLabelAstrick = forwardRef<React.ElementRef<typeof Paragraph>, FormControlLabelAstrickProps>(
  function FormControlLabelAstrick(props, ref) {
    return (
      <Paragraph ref={ref} color="$red10" fontSize={14} fontWeight="600" {...props}>
        *
      </Paragraph>
    );
  }
);

export interface FormControlHelperProps extends React.ComponentPropsWithoutRef<typeof XStack> {
  className?: string;
}

/** Container positioned beneath an input for instructions and hints. */
export const FormControlHelper = forwardRef<React.ElementRef<typeof XStack>, FormControlHelperProps>(
  function FormControlHelper({ children, ...props }, ref) {
    return (
      <XStack ref={ref} alignItems="center" gap={4} marginTop={2} {...props}>
        {children}
      </XStack>
    );
  }
);

export interface FormControlHelperTextProps extends React.ComponentPropsWithoutRef<typeof Paragraph> {
  className?: string;
}

/** Subdued instructional caption providing guidance to the user. */
export const FormControlHelperText = forwardRef<React.ElementRef<typeof Paragraph>, FormControlHelperTextProps>(
  function FormControlHelperText({ children, ...props }, ref) {
    return (
      <Paragraph ref={ref} fontSize={12} color="$colorHover" {...props}>
        {children}
      </Paragraph>
    );
  }
);

export interface FormControlErrorProps extends React.ComponentPropsWithoutRef<typeof XStack> {
  className?: string;
}

/** Conditionally rendered container for validation failure alerts. */
export const FormControlError = forwardRef<React.ElementRef<typeof XStack>, FormControlErrorProps>(
  function FormControlError({ children, ...props }, ref) {
    const { isInvalid } = useContext(FormControlContext);
    if (!isInvalid) return null;

    return (
      <XStack ref={ref} alignItems="center" gap={4} marginTop={2} {...props}>
        {children}
      </XStack>
    );
  }
);

export interface FormControlErrorTextProps extends React.ComponentPropsWithoutRef<typeof Paragraph> {
  className?: string;
}

/**
 * Descriptive error message typography rendered in high-contrast destructive
 * colors.
 */
export const FormControlErrorText = forwardRef<React.ElementRef<typeof Paragraph>, FormControlErrorTextProps>(
  function FormControlErrorText({ children, ...props }, ref) {
    return (
      <Paragraph ref={ref} fontSize={12} fontWeight="500" color="$red10" {...props}>
        {children}
      </Paragraph>
    );
  }
);

export interface FormControlErrorIconProps {
  as?: React.ElementType;
  size?: number | string;
  height?: number;
  width?: number;
  color?: string;
  className?: string;
  [key: string]: any;
}

/** Warning icon rendered alongside validation error messages. */
export const FormControlErrorIcon = forwardRef<any, FormControlErrorIconProps>(function FormControlErrorIcon(
  { as: Component, size = 14, height, width, color = "#ef4444", ...props },
  ref
) {
  const dim = height ?? width ?? (typeof size === "number" ? size : 14);
  if (Component) {
    return <Component ref={ref} size={dim} width={dim} height={dim} color={color} {...props} />;
  }
  return null;
});

FormControl.displayName = "FormControl";
FormControlLabel.displayName = "FormControlLabel";
FormControlLabelText.displayName = "FormControlLabelText";
FormControlLabelAstrick.displayName = "FormControlLabelAstrick";
FormControlHelper.displayName = "FormControlHelper";
FormControlHelperText.displayName = "FormControlHelperText";
FormControlError.displayName = "FormControlError";
FormControlErrorText.displayName = "FormControlErrorText";
FormControlErrorIcon.displayName = "FormControlErrorIcon";
