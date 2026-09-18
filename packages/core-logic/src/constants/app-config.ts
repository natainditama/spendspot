/**
 * Global application configuration constants for the SpendSpot ecosystem.
 * Defines branding parameters, geofencing bounds, and AI system limits.
 */
export const APP_CONFIG = {
  appName: "SpendSpot",
  domain: "natatama.com",
  bundleId: "com.natatama.spendspot",
  scheme: "spendspot",
  universalLink: "https://spendspot.natatama.com",
  defaultGeofenceRadiusMeters: 75,
  minGeofenceRadiusMeters: 30,
  maxGeofenceRadiusMeters: 300,
  defaultDailyAiLimit: 20,
  thresholdAlertPercent: 80,
  exceededAlertPercent: 100,
};
