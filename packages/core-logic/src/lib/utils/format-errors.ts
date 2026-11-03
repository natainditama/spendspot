import { AuthError } from "@supabase/supabase-js";
import { z } from "zod";

import type { ServiceResponse } from "../../types/response";

/**
 * Transforms runtime validation or database errors into structured field-level error mappings.
 */
export function formatValidationErrors(err: unknown, fallbackMessage: string): ServiceResponse<never> {
  const validationErrors: Record<string, string> = {};

  if (err instanceof z.ZodError) {
    if (err.issues && err.issues.length > 0) {
      err.issues.forEach((issue) => {
        const path = issue.path.join(".") || "form";
        validationErrors[path] = issue.message;
      });

      return {
        success: false,
        message: err.issues[0]?.message || fallbackMessage,
        errors: validationErrors,
      };
    }

    return {
      success: false,
      message: err.message || fallbackMessage,
      errors: { form: err.message },
    };
  }

  if (err instanceof AuthError) {
    const msg = err.message;
    const lower = msg.toLowerCase();
    const fieldKey = lower.includes("email") ? "email" : lower.includes("password") ? "password" : "auth";

    validationErrors[fieldKey] = msg;

    return {
      success: false,
      message: msg,
      errors: validationErrors,
      stack: err.stack,
    };
  }

  if (err instanceof Error) {
    return {
      success: false,
      message: err.message,
      errors: {
        error: err.message,
      },
      stack: err.stack,
    };
  }

  return {
    success: false,
    message: fallbackMessage,
    errors: {
      error: fallbackMessage,
    },
  };
}
