import { tva } from "@gluestack-ui/utils/nativewind-utils";

/**
 * Variant styles for the root Calendar card container. Configures border
 * bounds, background colors, and responsive padding scales.
 */
export const calendarStyle = tva({
  base: "w-full web:w-fit bg-background border border-border rounded-lg p-4 gap-2",
  variants: {
    size: {
      sm: "p-2 gap-2",
      md: "p-2 gap-1",
      lg: "p-6 gap-6",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

/**
 * Header compartment layout styling for month title and navigation buttons.
 * Arranges navigation arrows and calendar titles across a spaced flex row.
 */
export const calendarHeaderStyle = tva({
  base: "flex-row items-center justify-between mb-2",
  variants: {},
});

/**
 * Interactive button styling for previous/next month navigation arrows. Sets
 * standardized square touch boundaries and hover highlight treatments.
 */
export const calendarHeaderButtonStyle = tva({
  base: "h-9 w-9 flex items-center justify-center rounded-md hover:bg-accent active:bg-accent/80 data-[disabled=true]:opacity-40 data-[disabled=true]:cursor-not-allowed",
  variants: {},
});

/**
 * Typographic headline styling for the active month and year calendar header.
 * Formats high-contrast font weights and readable base size typography.
 */
export const calendarHeaderTitleStyle = tva({
  base: "text-foreground text-base font-semibold",
  variants: {},
});

/**
 * Horizontal week days column header row styling container. Aligns day-of-week
 * abbreviations directly above their matching date columns.
 */
export const calendarWeekDaysHeaderStyle = tva({
  base: "flex-row gap-0 mb-2",
  variants: {},
});

/**
 * Individual weekday column header slot bounding box styling. Establishes equal
 * proportional cell widths across the calendar grid.
 */
export const calendarWeekDayStyle = tva({
  base: "flex-1 items-center justify-center min-w-[2.0rem] web:max-w-[2.5rem]",
  variants: {},
});

/**
 * Typographic styling for weekday abbreviation headers (e.g. Mon, Tue). Renders
 * subdued uppercase micro-copy with consistent tracking.
 */
export const calendarWeekDayTextStyle = tva({
  base: "text-muted-foreground text-xs font-medium uppercase",
  variants: {},
  parentVariants: {},
});

/**
 * Main scrollable body container holding rows of calendar weeks. Maintains
 * vertical stacking rhythm without introducing extra column margins.
 */
export const calendarBodyStyle = tva({
  base: "gap-0",
  variants: {},
});

/**
 * Month grid layout styling organizing week rows and date cell items. Enforces
 * uniform grid alignment across all rendered monthly dates.
 */
export const calendarGridStyle = tva({
  base: "gap-0",
  variants: {},
});

/**
 * Single week row layout container aligning seven day cells horizontally.
 * Distributes days evenly across the horizontal grid axis.
 */
export const calendarWeekStyle = tva({
  base: "flex-row gap-0",
  variants: {},
});

/**
 * Interactive calendar day cell styling mapping to selection and range states.
 * Formats rounded active backgrounds, range connectors, and disabled states.
 */
export const calendarDayStyle = tva({
  base: "flex-1 aspect-square items-center justify-center rounded-md web:max-w-[2.25rem] relative transition-colors",
  variants: {
    state: {
      default: "hover:bg-accent active:bg-accent/80",
      selected: "bg-primary hover:bg-primary/90 active:bg-primary/80",
      today: "bg-accent",
      disabled: "opacity-40 cursor-not-allowed",
      "outside-month": "opacity-30",
      "range-start": "bg-primary rounded-r-md",
      "range-end": "bg-primary rounded-l-md",
      "range-middle": "bg-primary/20 rounded-none",
    },
  },
});

/**
 * Typographic styling for numeric day labels displayed inside calendar day
 * cells. Adjusts font colors and weights according to today, selected, and
 * range states.
 */
export const calendarDayTextStyle = tva({
  base: "text-foreground text-sm font-normal z-10",
  variants: {
    state: {
      default: "text-foreground",
      selected: "text-primary-foreground ",
      today: "text-accent-foreground",
      disabled: "text-muted-foreground",
      "outside-month": "text-muted-foreground",
      "range-start": "text-primary-foreground font-semibold",
      "range-end": "text-primary-foreground font-semibold",
      "range-middle": "text-foreground",
    },
  },
});

/**
 * Event marker indicator container positioned at the bottom of calendar day
 * cells. Houses single-dot, multi-dot, or background period highlights for
 * scheduled events.
 */
export const calendarDayIndicatorStyle = tva({
  base: "absolute bottom-1 flex-row gap-0.5 z-0",
  variants: {
    type: {
      dot: "flex-row gap-0.5",
      "multi-dot": "flex-row gap-0.5",
      period: "absolute inset-0 rounded-md opacity-20",
    },
  },
});

/**
 * Circular marker dot styling indicating events or reminders on specific dates.
 * Applies tiny spherical geometry with customizable event theme colors.
 */
export const calendarDotStyle = tva({
  base: "w-1 h-1 rounded-full",
  variants: {},
});

/**
 * Week number column container bounding box styling. Displays sequential annual
 * week indicators beside corresponding week rows.
 */
export const calendarWeekNumberStyle = tva({
  base: "w-8 items-center justify-center mr-1",
  variants: {},
});

/**
 * Typographic styling for annual calendar week sequence numbers. Formats
 * subtle, low-emphasis numeric labels along the week grid margin.
 */
export const calendarWeekNumberTextStyle = tva({
  base: "text-muted-foreground text-xs font-normal",
  variants: {},
  parentVariants: {},
});

/**
 * Bottom calendar action footer container with top border separation. Houses
 * action triggers like 'Today', 'Clear', or custom confirmation buttons.
 */
export const calendarFooterStyle = tva({
  base: "mt-4 pt-4 border-t border-border",
  variants: {},
});

/**
 * Header month and year dropdown selection menu trigger button styling. Renders
 * a subtle bordered pill permitting quick navigational month jumping.
 */
export const calendarHeaderSelectStyle = tva({
  base: "bg-transparent border border-border rounded-md px-2 py-1 text-sm text-foreground",
  variants: {},
});
