export interface LoginFormValues {
  email: string;
  password: string;
}

export interface RegisterFormValues {
  fullName: string;
  email: string;
  password: string;
}

export type LoginFormErrors = Partial<Record<keyof LoginFormValues, string>>;
export type RegisterFormErrors = Partial<Record<keyof RegisterFormValues, string>>;

export interface AuthLoginScreenProps {
  /** Optional prefilled email address for returning users */
  initialEmail?: string;
  /** Callback triggered when user submits email and password credentials */
  onLogin?: (credentials: LoginFormValues) => void | Promise<void>;
  /** Callback triggered when user taps the Google SSO authentication button */
  onGoogleLogin?: () => void | Promise<void>;
  /** Callback triggered when user taps 'Forgot password?' */
  onForgotPassword?: () => void;
  /** Callback triggered when user taps 'Sign up' to navigate to registration */
  onNavigateToRegister?: () => void;
  /** Callback triggered when user taps 'Terms of Service' */
  onTermsPress?: () => void;
  /** Callback triggered when user taps 'Privacy Policy' */
  onPrivacyPress?: () => void;
  /** Optional callback triggered when Zod validation fails */
  onValidationError?: (errors: LoginFormErrors) => void;
  /** Optional loading state for async network operations */
  isLoading?: boolean;
  /** Optional test ID for automated testing */
  testID?: string;
}

export interface AuthForgotDialogProps {
  /** Controls modal dialog visibility */
  open: boolean;
  /** Callback fired when dialog open state changes */
  onOpenChange: (open: boolean) => void;
  /** Callback fired when user submits the password reset form */
  onSubmit: (email: string) => Promise<boolean | void>;
  /** Optional loading state during async request */
  isLoading?: boolean;
}

export interface AuthRegisterScreenProps {
  /** Optional prefilled initial full name */
  initialFullName?: string;
  /** Optional prefilled initial email */
  initialEmail?: string;
  /** Callback triggered when user submits registration credentials */
  onRegister?: (data: RegisterFormValues) => void | Promise<void>;
  /** Callback triggered when user taps the Google sign-up SSO button */
  onGoogleRegister?: () => void | Promise<void>;
  /** Callback triggered when user taps 'Log in' to navigate to login */
  onNavigateToLogin?: () => void;
  /** Callback triggered when user taps 'Terms of Service' */
  onTermsPress?: () => void;
  /** Callback triggered when user taps 'Privacy Policy' */
  onPrivacyPress?: () => void;
  /** Optional callback triggered when Zod validation fails */
  onValidationError?: (errors: RegisterFormErrors) => void;
  /** Optional loading state for async network operations */
  isLoading?: boolean;
  /** Optional test ID for automated testing */
  testID?: string;
}

export interface ResetPasswordFormValues {
  password: string;
  confirmPassword: string;
}

export type ResetPasswordFormErrors = Partial<Record<keyof ResetPasswordFormValues, string>>;

export interface AuthResetScreenProps {
  /** Callback triggered when user submits new password */
  onSubmit: (values: ResetPasswordFormValues) => void | Promise<void>;
  /** Callback triggered when user cancels or taps back to sign in */
  onNavigateToLogin?: () => void;
  /** Optional loading state for async network operations */
  isLoading?: boolean;
  /** Optional test ID for automated testing */
  testID?: string;
}
