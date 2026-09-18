type DateInput = Date | string | number;

function toDate(input: DateInput): Date {
  if (input instanceof Date) {
    return input;
  }
  return new Date(input);
}

/** Formats a timestamp or Date instance into a localized calendar string. */
export function formatDate(date: DateInput, locale: string = "id-ID", options?: Intl.DateTimeFormatOptions): string {
  const d = toDate(date);
  if (isNaN(d.getTime())) {
    return "-";
  }

  const defaultOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  try {
    return new Intl.DateTimeFormat(locale, options || defaultOptions).format(d);
  } catch {
    return d.toLocaleDateString();
  }
}

/** Formats a timestamp into a humanized relative time description (e.g. "5 minutes ago", "kemarin"). */
export function formatRelativeTime(date: DateInput, locale: string = "id-ID"): string {
  const d = toDate(date);
  if (isNaN(d.getTime())) {
    return "-";
  }

  const now = Date.now();
  const diffInSeconds = Math.round((d.getTime() - now) / 1000);
  const absDiff = Math.abs(diffInSeconds);

  try {
    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

    if (absDiff < 60) {
      return rtf.format(diffInSeconds, "second");
    }

    const diffInMinutes = Math.round(diffInSeconds / 60);
    if (Math.abs(diffInMinutes) < 60) {
      return rtf.format(diffInMinutes, "minute");
    }

    const diffInHours = Math.round(diffInMinutes / 60);
    if (Math.abs(diffInHours) < 24) {
      return rtf.format(diffInHours, "hour");
    }

    const diffInDays = Math.round(diffInHours / 24);
    if (Math.abs(diffInDays) < 30) {
      return rtf.format(diffInDays, "day");
    }

    const diffInMonths = Math.round(diffInDays / 30);
    if (Math.abs(diffInMonths) < 12) {
      return rtf.format(diffInMonths, "month");
    }

    const diffInYears = Math.round(diffInDays / 365);
    return rtf.format(diffInYears, "year");
  } catch {
    return formatDate(d, locale);
  }
}

/** Formats a date range into a localized interval (e.g. "1 – 30 Sep 2026"). */
export function formatDateRange(startDate: DateInput, endDate: DateInput, locale: string = "id-ID"): string {
  const start = toDate(startDate);
  const end = toDate(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return "-";
  }

  try {
    const formatter = new Intl.DateTimeFormat(locale, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    if (typeof formatter.formatRange === "function") {
      return formatter.formatRange(start, end);
    }

    return `${formatter.format(start)} - ${formatter.format(end)}`;
  } catch {
    return `${formatDate(start, locale)} - ${formatDate(end, locale)}`;
  }
}
