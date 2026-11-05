import { supabase } from "../lib/supabase";
import type { CurrencyCode } from "../lib/utils/format-currency";
import { formatValidationErrors } from "../lib/utils/format-errors";
import type { UserProfile } from "../types/database";
import type { ServiceResponse } from "../types/response";

export interface SaveSetupPreferencesPayload {
  userId: string;
  currency: CurrencyCode;
  dailyCap: number;
  monthlyCap: number;
  weeklyCap?: number;
}

/**
 * Persists user financial baseline preferences (currency, daily budget cap, and monthly limit)
 * to the Supabase public.users profile table.
 */
export async function saveSetupPreferences({
  userId,
  currency,
  dailyCap,
  monthlyCap,
  weeklyCap = Math.round(dailyCap * 7),
}: SaveSetupPreferencesPayload): Promise<ServiceResponse<UserProfile>> {
  try {
    if (!userId) {
      return {
        success: false,
        message: "User ID is required to save setup preferences.",
        errors: {
          userId: "User ID is missing from authentication context.",
        },
      };
    }

    const { data, error } = await supabase
      .from("users")
      .update({
        preferred_currency: currency,
        daily_limit: dailyCap,
        weekly_limit: weeklyCap,
        monthly_limit: monthlyCap,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userId)
      .select()
      .single();

    if (error) {
      return formatValidationErrors(error, "Failed to save setup preferences.");
    }

    if (!data) {
      return {
        success: false,
        message: "User profile was not returned after saving preferences.",
        errors: {
          profile: "Record could not be retrieved after update.",
        },
      };
    }

    return {
      success: true,
      message: "Setup preferences saved successfully.",
      data: data as UserProfile,
    };
  } catch (err) {
    return formatValidationErrors(err, "An unexpected error occurred while saving setup preferences.");
  }
}

/**
 * Retrieves existing user profile and setup preferences from public.users.
 */
export async function getSetupPreferences(userId: string): Promise<ServiceResponse<UserProfile>> {
  try {
    if (!userId) {
      return {
        success: false,
        message: "User ID is required to fetch setup preferences.",
        errors: {
          userId: "User ID is missing.",
        },
      };
    }

    const { data, error } = await supabase.from("users").select("*").eq("user_id", userId).maybeSingle();

    if (error) {
      return formatValidationErrors(error, "Failed to load setup preferences.");
    }

    if (!data) {
      return {
        success: false,
        message: "No user profile found.",
        errors: {
          profile: "User profile not found in database.",
        },
      };
    }

    return {
      success: true,
      message: "Setup preferences loaded successfully.",
      data: data as UserProfile,
    };
  } catch (err) {
    return formatValidationErrors(err, "An unexpected error occurred while loading setup preferences.");
  }
}
