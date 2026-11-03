import type { CurrencyCode } from "../../lib/utils/format-currency";

export interface DashboardExpenseItem {
  id: string;
  title: string;
  amount: number;
  iconType: "coffee" | "train" | "fuel" | "custom";
  timeText: string;
  paymentMethod: string;
}

export interface DashboardGeofenceStatus {
  spotName: string;
  isSaved: boolean;
  radiusText: string;
  paymentMethod: string;
  platformText: string;
  loggedAmount: number;
  isLogged: boolean;
}

export interface HomeDashboardScreenProps {
  /** User name displayed in header greeting */
  userName?: string;
  /** Currency code for monetary formatting */
  currency?: CurrencyCode;
  /** Amount spent today */
  spentToday?: number;
  /** Total daily spending cap */
  dailyCap?: number;
  /** Active detected geofence spot status */
  activeGeofence?: DashboardGeofenceStatus;
  /** Recent transactions listed in Today's Expenses */
  recentExpenses?: DashboardExpenseItem[];
  /** Callback fired when user taps the top notification bell */
  onNotificationPress?: () => void;
  /** Callback fired when user taps the top user avatar */
  onProfilePress?: () => void;
  /** Callback fired when user taps the geofence log ticket CTA */
  onLogTicketPress?: () => void;
  /** Callback fired when user taps "Add Exp" quick action */
  onAddExpensePress?: () => void;
  /** Callback fired when user taps "Scan" quick action */
  onScanReceiptPress?: () => void;
  /** Callback fired when user taps "Ask AI" quick action */
  onAskAIPress?: () => void;
  /** Callback fired when user taps "New Spot" quick action */
  onNewSpotPress?: () => void;
  /** Callback fired when user taps "See All" expenses */
  onSeeAllExpensesPress?: () => void;
  /** Callback fired when user dismisses the 80% threshold warning */
  onDismissWarning?: () => void;
  /** Optional active tab indicator */
  activeTab?: string;
  /** Optional tab change callback */
  onTabChange?: (tabKey: string) => void;
  /** Test identifier for automated testing */
  testID?: string;
}
