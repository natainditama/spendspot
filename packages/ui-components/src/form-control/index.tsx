"use client";
import { Text, View } from "react-native";
import React from "react";
import { createFormControl } from "@gluestack-ui/core/form-control/creator";
import { type VariantProps, tva, withStyleContext } from "@gluestack-ui/utils/nativewind-utils";
import { styled } from "nativewind";
import { UIIcon } from "@gluestack-ui/core/icon/creator";

const SCOPE = "FORM_CONTROL";

/**
 * Layout container style variant generator for form control fields. Arranges
 * labels, inputs, helpers, and validation messages vertically.
 */
const formControlStyle = tva({
  base: "flex flex-col",
});

/**
 * Visual warning icon styles rendered alongside validation error messages. Sets
 * standardized proportions and destructive alert coloration.
 */
const formControlErrorIconStyle = tva({
  base: "text-destructive fill-none h-[18px] w-[18px]",
});

/**
 * Layout wrapper style variant generator for error messaging rows. Positions
 * icons and descriptive error text horizontally with compact spacing.
 */
const formControlErrorStyle = tva({
  base: "flex flex-row justify-start items-center mt-1 gap-1",
});

/**
 * Typography style variant generator for validation error messages. Applies
 * destructive color accents and supports various typographic modifiers.
 */
const formControlErrorTextStyle = tva({
  base: "text-destructive text-xs font-body",
  variants: {
    isTruncated: {
      true: "web:truncate",
    },
    bold: {
      true: "font-bold",
    },
    underline: {
      true: "underline",
    },
    strikeThrough: {
      true: "line-through",
    },
    sub: {
      true: "text-xs",
    },
    italic: {
      true: "italic",
    },
    highlight: {
      true: "bg-yellow-500",
    },
  },
});

/**
 * Layout wrapper style variant generator for explanatory helper text sections.
 * Arranges informational messages below form inputs with subtle vertical
 * margins.
 */
const formControlHelperStyle = tva({
  base: "flex flex-row justify-start items-center mt-1 font-body",
});

/**
 * Informational caption typography styles for input assistance and
 * instructions. Displays subdued secondary tones with flexible text formatting
 * variants.
 */
const formControlHelperTextStyle = tva({
  base: "text-foreground/70 font-body text-sm",
  variants: {
    isTruncated: {
      true: "web:truncate",
    },
    bold: {
      true: "font-bold",
    },
    underline: {
      true: "underline",
    },
    strikeThrough: {
      true: "line-through",
    },
    sub: {
      true: "text-xs",
    },
    italic: {
      true: "italic",
    },
    highlight: {
      true: "bg-yellow-500",
    },
  },
});

/**
 * Container style variant generator for form field labels and required
 * indicators. Positions label typography and asterisks in a cohesive horizontal
 * row.
 */
const formControlLabelStyle = tva({
  base: "flex flex-row justify-start items-center mb-1",
});

/**
 * Primary typography styles for input field descriptive labels. Enforces clear
 * typographic hierarchy with customizable weight and style modifiers.
 */
const formControlLabelTextStyle = tva({
  base: "font-medium text-foreground text-base font-body",
  variants: {
    isTruncated: {
      true: "web:truncate",
    },
    bold: {
      true: "font-bold",
    },
    underline: {
      true: "underline",
    },
    strikeThrough: {
      true: "line-through",
    },
    sub: {
      true: "text-xs",
    },
    italic: {
      true: "italic",
    },
    highlight: {
      true: "bg-yellow-500",
    },
  },
});

/**
 * Styling variant generator for mandatory field asterisk badges. Matches parent
 * label baseline metrics while emphasizing required inputs.
 */
const formControlLabelAstrickStyle = tva({
  base: "font-medium text-foreground text-base",
  variants: {
    isTruncated: {
      true: "web:truncate",
    },
    bold: {
      true: "font-bold",
    },
    underline: {
      true: "underline",
    },
    strikeThrough: {
      true: "line-through",
    },
    sub: {
      true: "text-xs",
    },
    italic: {
      true: "italic",
    },
    highlight: {
      true: "bg-yellow-500",
    },
  },
});

type IFormControlLabelAstrickProps = React.ComponentPropsWithoutRef<typeof Text> &
  VariantProps<typeof formControlLabelAstrickStyle>;

/**
 * Visual indicator denoting a mandatory or required form input field. Renders
 * an asterisk symbol adhering to accessibility and theme styling.
 */
const FormControlLabelAstrick = React.forwardRef<React.ComponentRef<typeof Text>, IFormControlLabelAstrickProps>(
  function FormControlLabelAstrick({ className, ...props }, ref) {
    return (
      <Text
        ref={ref}
        className={formControlLabelAstrickStyle({
          class: className,
        })}
        {...props}
      />
    );
  }
);

const StyledUIIcon = styled(UIIcon, { className: "style" });

export const UIFormControl = createFormControl({
  Root: withStyleContext(View, SCOPE),
  Error: View,
  ErrorText: Text,
  ErrorIcon: StyledUIIcon,
  Label: View,
  LabelText: Text,
  LabelAstrick: FormControlLabelAstrick,
  Helper: View,
  HelperText: Text,
});

type IFormControlProps = React.ComponentProps<typeof UIFormControl> & VariantProps<typeof formControlStyle>;

/**
 * Contextual container managing accessible form control states and validation
 * feedback. Provides unified state propagation for inputs, labels, helpers, and
 * error messages.
 */
const FormControl = React.forwardRef<React.ComponentRef<typeof UIFormControl>, IFormControlProps>(function FormControl(
  { className, ...props },
  ref
) {
  return <UIFormControl ref={ref} className={formControlStyle({ class: className })} {...props} />;
});

type IFormControlErrorProps = React.ComponentProps<typeof UIFormControl.Error> &
  VariantProps<typeof formControlErrorStyle>;

/**
 * Visual container conditionally rendered when form field validation fails.
 * Groups error icons and descriptive error messages in an aligned horizontal
 * row.
 */
const FormControlError = React.forwardRef<React.ComponentRef<typeof UIFormControl.Error>, IFormControlErrorProps>(
  function FormControlError({ className, ...props }, ref) {
    return <UIFormControl.Error ref={ref} className={formControlErrorStyle({ class: className })} {...props} />;
  }
);

type IFormControlErrorTextProps = React.ComponentProps<typeof UIFormControl.Error.Text> &
  VariantProps<typeof formControlErrorTextStyle>;

/**
 * Descriptive error message text element communicating validation failure
 * details. Employs destructive text styling and supports truncation or
 * typographic accents.
 */
const FormControlErrorText = React.forwardRef<
  React.ComponentRef<typeof UIFormControl.Error.Text>,
  IFormControlErrorTextProps
>(function FormControlErrorText({ className, ...props }, ref) {
  return (
    <UIFormControl.Error.Text
      className={formControlErrorTextStyle({
        class: className,
      })}
      ref={ref}
      {...props}
    />
  );
});

type IFormControlErrorIconProps = React.ComponentProps<typeof UIFormControl.Error.Icon> &
  VariantProps<typeof formControlErrorIconStyle>;

/**
 * Warning icon rendered adjacent to form validation error text. Displays
 * theme-aware alert iconography indicating input issues.
 */
const FormControlErrorIcon = React.forwardRef<
  React.ComponentRef<typeof UIFormControl.Error.Icon>,
  IFormControlErrorIconProps
>(function FormControlErrorIcon({ className, ...props }, ref) {
  return <UIFormControl.Error.Icon ref={ref} {...props} className={formControlErrorIconStyle({ class: className })} />;
});

type IFormControlLabelProps = React.ComponentProps<typeof UIFormControl.Label> &
  VariantProps<typeof formControlLabelStyle> & {
    htmlFor?: string;
    role?: string;
  };

/**
 * Layout container wrapping form input descriptive titles and required markers.
 * Aligns label text and asterisk indicators horizontally above target inputs.
 */
const FormControlLabel = React.forwardRef<React.ComponentRef<typeof UIFormControl.Label>, IFormControlLabelProps>(
  function FormControlLabel({ className, ...props }, ref) {
    return <UIFormControl.Label ref={ref} className={formControlLabelStyle({ class: className })} {...props} />;
  }
);

type IFormControlLabelTextProps = React.ComponentProps<typeof UIFormControl.Label.Text> &
  VariantProps<typeof formControlLabelTextStyle>;

/**
 * Text component displaying the descriptive title of an input control. Sets
 * high-contrast typography and supports text truncation variants.
 */
const FormControlLabelText = React.forwardRef<
  React.ComponentRef<typeof UIFormControl.Label.Text>,
  IFormControlLabelTextProps
>(function FormControlLabelText({ className, ...props }, ref) {
  return (
    <UIFormControl.Label.Text
      className={formControlLabelTextStyle({
        class: className,
      })}
      ref={ref}
      {...props}
    />
  );
});

type IFormControlHelperProps = React.ComponentProps<typeof UIFormControl.Helper> &
  VariantProps<typeof formControlHelperStyle>;

/**
 * Explanatory helper row positioned below the form input component. Provides
 * structural alignment for secondary instructions and guidance.
 */
const FormControlHelper = React.forwardRef<React.ComponentRef<typeof UIFormControl.Helper>, IFormControlHelperProps>(
  function FormControlHelper({ className, ...props }, ref) {
    return (
      <UIFormControl.Helper
        ref={ref}
        className={formControlHelperStyle({
          class: className,
        })}
        {...props}
      />
    );
  }
);

type IFormControlHelperTextProps = React.ComponentProps<typeof UIFormControl.Helper.Text> &
  VariantProps<typeof formControlHelperTextStyle>;

/**
 * Informational text providing contextual input hints or format requirements.
 * Formats secondary typography with subdued tones to reduce visual
 * competition.
 */
const FormControlHelperText = React.forwardRef<
  React.ComponentRef<typeof UIFormControl.Helper.Text>,
  IFormControlHelperTextProps
>(function FormControlHelperText({ className, ...props }, ref) {
  return (
    <UIFormControl.Helper.Text
      className={formControlHelperTextStyle({
        class: className,
      })}
      ref={ref}
      {...props}
    />
  );
});

FormControl.displayName = "FormControl";
FormControlError.displayName = "FormControlError";
FormControlErrorText.displayName = "FormControlErrorText";
FormControlErrorIcon.displayName = "FormControlErrorIcon";
FormControlLabel.displayName = "FormControlLabel";
FormControlLabelText.displayName = "FormControlLabelText";
FormControlLabelAstrick.displayName = "FormControlLabelAstrick";
FormControlHelper.displayName = "FormControlHelper";
FormControlHelperText.displayName = "FormControlHelperText";

export {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlErrorIcon,
  FormControlLabel,
  FormControlLabelText,
  FormControlLabelAstrick,
  FormControlHelper,
  FormControlHelperText,
};
