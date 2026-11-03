export interface AuthLoginScreenProps {
  /** Optional prefilled email address for returning users */
  initialEmail?: string;
  /** Callback triggered when user submits email and password credentials */
  onLogin?: (credentials: { email: string; password: string }) => void;
  /** Callback triggered when user taps the Google SSO authentication button */
  onGoogleLogin?: () => void;
  /** Callback triggered when user taps 'Forgot password?' */
  onForgotPassword?: () => void;
  /** Callback triggered when user taps 'Sign up' to navigate to registration */
  onNavigateToRegister?: () => void;
  /** Callback triggered when user taps 'Terms of Service' */
  onTermsPress?: () => void;
  /** Callback triggered when user taps 'Privacy Policy' */
  onPrivacyPress?: () => void;
  /** Optional loading state for async network operations */
  isLoading?: boolean;
  /** Optional test ID for automated testing */
  testID?: string;
}

export interface AuthRegisterScreenProps {
  /** Optional prefilled initial full name */
  initialFullName?: string;
  /** Optional prefilled initial email */
  initialEmail?: string;
  /** Callback triggered when user submits registration credentials */
  onRegister?: (data: { fullName: string; email: string; password: string }) => void;
  /** Callback triggered when user taps the Google sign-up SSO button */
  onGoogleRegister?: () => void;
  /** Callback triggered when user taps 'Log in' to navigate to login */
  onNavigateToLogin?: () => void;
  /** Callback triggered when user taps 'Terms of Service' */
  onTermsPress?: () => void;
  /** Callback triggered when user taps 'Privacy Policy' */
  onPrivacyPress?: () => void;
  /** Optional loading state for async network operations */
  isLoading?: boolean;
  /** Optional test ID for automated testing */
  testID?: string;
}
