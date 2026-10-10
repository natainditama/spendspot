export type OnboardingSlideId = "commute" | "budget" | "copilot";

export interface OnboardingSlideConfig {
  id: OnboardingSlideId;
  titleKey: string;
  descriptionKey: string;
}

export interface OnboardingScreenProps {
  /** Optional initial slide index (0 to 2). Defaults to 0. */
  initialSlideIndex?: number;
  /** Callback fired when the primary CTA is pressed. */
  onReadyToRide?: () => void;
  /** Callback fired when the secondary CTA is pressed. */
  onAlreadyHaveAccount?: () => void;
  /** Callback fired when the top navigation back chevron is pressed. */
  onBack?: () => void;
  /** Callback fired when the skip action is pressed, if available. */
  onSkip?: () => void;
  /** Optional test ID for automated end-to-end testing suites. */
  testID?: string;
}

export interface OnboardingPaginationProps {
  totalSlides: number;
  activeIndex: number;
  onSelectIndex: (index: number) => void;
}

export interface OnboardingCommutePreviewProps {
  onConfirmTrip?: () => void;
}
