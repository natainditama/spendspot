"use client";

import { createCalendar, type ICalendarProps } from "@gluestack-ui/core/calendar/creator";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { Menu, MenuItem, MenuItemLabel } from "../menu";
import {
  calendarBodyStyle,
  calendarDayIndicatorStyle,
  calendarDayStyle,
  calendarDayTextStyle,
  calendarFooterStyle,
  calendarGridStyle,
  calendarHeaderButtonStyle,
  calendarHeaderSelectStyle,
  calendarHeaderStyle,
  calendarHeaderTitleStyle,
  calendarStyle,
  calendarWeekDaysHeaderStyle,
  calendarWeekDayStyle,
  calendarWeekDayTextStyle,
  calendarWeekNumberStyle,
  calendarWeekNumberTextStyle,
  calendarWeekStyle,
} from "./styles";

// Styled Root Component
const CalendarRoot = React.forwardRef<
  React.ElementRef<typeof View>,
  ICalendarProps & React.ComponentProps<typeof View> & { className?: string }
>(({ className, ...props }, ref) => {
  return <View ref={ref} className={calendarStyle({ class: className })} {...props} />;
});
CalendarRoot.displayName = "CalendarRoot";

// Styled Header
const CalendarHeaderRoot = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentProps<typeof View> & { className?: string }
>(({ className, ...props }, ref) => {
  return <View ref={ref} className={calendarHeaderStyle({ class: className })} {...props} />;
});
CalendarHeaderRoot.displayName = "CalendarHeaderRoot";

const CalendarHeaderPrevButtonRoot = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentProps<typeof Pressable> & {
    className?: string;
    disabled?: boolean;
  }
>(({ className, disabled, ...props }, ref) => {
  return (
    <Pressable
      ref={ref}
      className={calendarHeaderButtonStyle({ class: className })}
      data-disabled={disabled}
      {...props}
    />
  );
});
CalendarHeaderPrevButtonRoot.displayName = "CalendarHeaderPrevButtonRoot";

const CalendarHeaderNextButtonRoot = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentProps<typeof Pressable> & {
    className?: string;
    disabled?: boolean;
  }
>(({ className, disabled, ...props }, ref) => {
  return (
    <Pressable
      ref={ref}
      className={calendarHeaderButtonStyle({ class: className })}
      data-disabled={disabled}
      {...props}
    />
  );
});
CalendarHeaderNextButtonRoot.displayName = "CalendarHeaderNextButtonRoot";

const CalendarHeaderTitleRoot = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentProps<typeof Text> & { className?: string }
>(({ className, ...props }, ref) => {
  return <Text ref={ref} className={calendarHeaderTitleStyle({ class: className })} {...props} />;
});
CalendarHeaderTitleRoot.displayName = "CalendarHeaderTitleRoot";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

type SelectRootProps = React.ComponentProps<typeof View> & {
  className?: string;
  items?: { label: string; value: number }[];
  selectedValue?: number;
  onValueChange?: (value: number) => void;
};

const CalendarHeaderMonthSelectRoot = React.forwardRef<React.ElementRef<typeof View>, SelectRootProps>(
  ({ className, items = [], selectedValue, onValueChange, ...props }, ref) => {
    const label = selectedValue !== undefined ? MONTH_NAMES[selectedValue] : "Month";
    return (
      <View ref={ref} className={calendarHeaderSelectStyle({ class: className })} {...props}>
        <Menu
          placement="bottom"
          offset={4}
          trigger={({ ...triggerProps }) => (
            <Pressable {...triggerProps} className="px-2 py-1 rounded-md flex-row items-center">
              <Text className="text-sm font-medium text-foreground">{label}</Text>
            </Pressable>
          )}
        >
          {items.map((item) => (
            <MenuItem key={item.value} textValue={item.label} onPress={() => onValueChange?.(item.value)}>
              <MenuItemLabel className={item.value === selectedValue ? "text-primary font-semibold" : ""}>
                {item.label}
              </MenuItemLabel>
            </MenuItem>
          ))}
        </Menu>
      </View>
    );
  }
);
CalendarHeaderMonthSelectRoot.displayName = "CalendarHeaderMonthSelectRoot";

const CalendarHeaderYearSelectRoot = React.forwardRef<React.ElementRef<typeof View>, SelectRootProps>(
  ({ className, items = [], selectedValue, onValueChange, ...props }, ref) => {
    const label = selectedValue !== undefined ? String(selectedValue) : "Year";
    return (
      <View ref={ref} className={calendarHeaderSelectStyle({ class: className })} {...props}>
        <Menu
          placement="bottom"
          offset={4}
          trigger={({ ...triggerProps }) => (
            <Pressable {...triggerProps} className="px-2 py-1 rounded-md flex-row items-center">
              <Text className="text-sm font-medium text-foreground">{label}</Text>
            </Pressable>
          )}
        >
          {items.map((item) => (
            <MenuItem key={item.value} textValue={item.label} onPress={() => onValueChange?.(item.value)}>
              <MenuItemLabel className={item.value === selectedValue ? "text-primary font-semibold" : ""}>
                {item.label}
              </MenuItemLabel>
            </MenuItem>
          ))}
        </Menu>
      </View>
    );
  }
);
CalendarHeaderYearSelectRoot.displayName = "CalendarHeaderYearSelectRoot";

// Styled Week Days Header
const CalendarWeekDaysHeaderRoot = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentProps<typeof View> & { className?: string }
>(({ className, ...props }, ref) => {
  return <View ref={ref} className={calendarWeekDaysHeaderStyle({ class: className })} {...props} />;
});
CalendarWeekDaysHeaderRoot.displayName = "CalendarWeekDaysHeaderRoot";

const CalendarWeekDayRoot = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentProps<typeof View> & { className?: string }
>(({ className, children, ...props }, ref) => {
  return (
    <View ref={ref} className={calendarWeekDayStyle({ class: className })} {...props}>
      {typeof children === "string" ? (
        <Text className={calendarWeekDayTextStyle({ class: "" })}>{children}</Text>
      ) : (
        children
      )}
    </View>
  );
});
CalendarWeekDayRoot.displayName = "CalendarWeekDayRoot";

// Styled Body & Grid
const CalendarBodyRoot = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentProps<typeof View> & { className?: string }
>(({ className, ...props }, ref) => {
  return <View ref={ref} className={calendarBodyStyle({ class: className })} {...props} />;
});
CalendarBodyRoot.displayName = "CalendarBodyRoot";

const CalendarGridRoot = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentProps<typeof View> & { className?: string }
>(({ className, ...props }, ref) => {
  return <View ref={ref} className={calendarGridStyle({ class: className })} {...props} />;
});
CalendarGridRoot.displayName = "CalendarGridRoot";

const CalendarWeekRoot = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentProps<typeof View> & { className?: string }
>(({ className, ...props }, ref) => {
  return <View ref={ref} className={calendarWeekStyle({ class: className })} {...props} />;
});
CalendarWeekRoot.displayName = "CalendarWeekRoot";

// Styled Day
const CalendarDayRoot = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentProps<typeof Pressable> & {
    className?: string;
    "data-state"?: string;
  }
>(({ className, "data-state": dataState, ...props }, ref) => {
  return (
    <Pressable
      ref={ref}
      className={calendarDayStyle({
        state: dataState as any,
        class: className,
      })}
      {...props}
    />
  );
});
CalendarDayRoot.displayName = "CalendarDayRoot";

const CalendarDayTextRoot = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentProps<typeof Text> & { className?: string; state?: any }
>(({ className, state, ...props }, ref) => {
  return (
    <Text
      ref={ref}
      className={calendarDayTextStyle({
        state:
          state?.isSelected && state?.isRangeStart
            ? "range-start"
            : state?.isSelected && state?.isRangeEnd
              ? "range-end"
              : state?.isInRange
                ? "range-middle"
                : state?.isSelected
                  ? "selected"
                  : state?.isToday
                    ? "today"
                    : state?.isDisabled
                      ? "disabled"
                      : state?.isOutsideMonth
                        ? "outside-month"
                        : "default",
        class: className,
      })}
      {...props}
    />
  );
});
CalendarDayTextRoot.displayName = "CalendarDayTextRoot";

const CalendarDayIndicatorRoot = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentProps<typeof View> & {
    className?: string;
    "data-type"?: string;
  }
>(({ className, "data-type": dataType, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={calendarDayIndicatorStyle({
        type: dataType as any,
        class: className,
      })}
      {...props}
    />
  );
});
CalendarDayIndicatorRoot.displayName = "CalendarDayIndicatorRoot";

// Styled Week Number
const CalendarWeekNumberRoot = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentProps<typeof View> & { className?: string }
>(({ className, children, ...props }, ref) => {
  return (
    <View ref={ref} className={calendarWeekNumberStyle({ class: className })} {...props}>
      {typeof children === "string" || typeof children === "number" ? (
        <Text className={calendarWeekNumberTextStyle({ class: "" })}>{children}</Text>
      ) : (
        children
      )}
    </View>
  );
});
CalendarWeekNumberRoot.displayName = "CalendarWeekNumberRoot";

// Styled Footer
const CalendarFooterRoot = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentProps<typeof View> & { className?: string }
>(({ className, ...props }, ref) => {
  return <View ref={ref} className={calendarFooterStyle({ class: className })} {...props} />;
});
CalendarFooterRoot.displayName = "CalendarFooterRoot";

/**
 * Primitive core calendar generator wiring monthly grid arithmetic and date
 * pickers. Composes navigation headers, week headers, day cells, indicators,
 * and footer slots.
 */
const UICalendar = createCalendar({
  Root: CalendarRoot,
  Header: CalendarHeaderRoot,
  HeaderPrevButton: CalendarHeaderPrevButtonRoot,
  HeaderNextButton: CalendarHeaderNextButtonRoot,
  HeaderTitle: CalendarHeaderTitleRoot,
  HeaderMonthSelect: CalendarHeaderMonthSelectRoot,
  HeaderYearSelect: CalendarHeaderYearSelectRoot,
  WeekDaysHeader: CalendarWeekDaysHeaderRoot,
  WeekDay: CalendarWeekDayRoot,
  Body: CalendarBodyRoot,
  Grid: CalendarGridRoot,
  Week: CalendarWeekRoot,
  Day: CalendarDayRoot,
  DayText: CalendarDayTextRoot,
  DayIndicator: CalendarDayIndicatorRoot,
  WeekNumber: CalendarWeekNumberRoot,
  Footer: CalendarFooterRoot,
});

// Mode-specific discriminated union props so onValueChange is correctly
// narrowed per mode (prevents TypeScript errors when passing setState).
type OmittedCalendarKeys = "mode" | "value" | "defaultValue" | "onValueChange";

type SingleModeProps = {
  mode?: "single";
  value?: Date;
  defaultValue?: Date;
  onValueChange?: (value: Date) => void;
};

type MultipleModeProps = {
  mode: "multiple";
  value?: Date[];
  defaultValue?: Date[];
  onValueChange?: (value: Date[]) => void;
};

type RangeModeProps = {
  mode: "range";
  value?: { from: Date; to?: Date };
  defaultValue?: { from: Date; to?: Date };
  onValueChange?: (value: { from: Date; to?: Date }) => void;
};

type CalendarProps = (SingleModeProps | MultipleModeProps | RangeModeProps) &
  Omit<ICalendarProps, OmittedCalendarKeys> &
  Omit<React.ComponentProps<typeof View>, OmittedCalendarKeys> & {
    className?: string;
  };

/**
 * Root calendar picker supporting single, multiple, and date-range selection
 * modes. Provides accessible date navigation, keyboard controls, and event
 * indicators.
 */
const CalendarComponent = React.forwardRef<React.ElementRef<typeof View>, CalendarProps>((props, ref) => {
  return <UICalendar ref={ref} {...(props as any)} />;
});
CalendarComponent.displayName = "Calendar";

/**
 * Primary calendar container managing month navigation and date selection
 * states. Renders an accessible datepicker supporting single date, multi-date,
 * and date ranges.
 */
export const Calendar = CalendarComponent;

/**
 * Top navigation header compartment coordinating month titles and navigation
 * buttons. Aligns pagination arrows and quick-select dropdown menus across a
 * responsive row.
 */
export const CalendarHeader = UICalendar.Header;

/**
 * Interactive button triggering navigation to the immediately preceding month.
 * Automatically respects min-date constraints and disables when out of bounds.
 */
export const CalendarHeaderPrevButton = UICalendar.HeaderPrevButton;

/**
 * Interactive button triggering navigation to the immediately succeeding month.
 * Automatically respects max-date constraints and disables when out of bounds.
 */
export const CalendarHeaderNextButton = UICalendar.HeaderNextButton;

/**
 * Headline label displaying the current month and year in the header bar.
 * Updates dynamically upon month navigation or direct date jumps.
 */
export const CalendarHeaderTitle = UICalendar.HeaderTitle;

/**
 * Month dropdown selector affording rapid jumps between different annual
 * months. Presents a contextual floating menu populated with all twelve
 * calendar months.
 */
export const CalendarHeaderMonthSelect = UICalendar.HeaderMonthSelect;

/**
 * Year dropdown selector affording rapid jumps between different chronological
 * years. Presents a contextual floating menu allowing fast multi-year
 * navigation.
 */
export const CalendarHeaderYearSelect = UICalendar.HeaderYearSelect;

/**
 * Row header component displaying the sequence of week day names. Standardizes
 * column labels across Monday through Sunday or custom start days.
 */
export const CalendarWeekDaysHeader = UICalendar.WeekDaysHeader;

/**
 * Individual weekday column header slot displaying abbreviated day names.
 * Aligns day typography directly above corresponding day date columns.
 */
export const CalendarWeekDay = UICalendar.WeekDay;

/**
 * Scrollable or static body container holding the matrix of monthly date cells.
 * Maintains consistent vertical spacing between rendered weeks.
 */
export const CalendarBody = UICalendar.Body;

/**
 * Multi-row grid layout structuring the monthly day cells into orderly weeks.
 * Enforces uniform cell dimensions across native mobile and web layouts.
 */
export const CalendarGrid = UICalendar.Grid;

/**
 * Single week row component grouping seven contiguous date cells. Distributes
 * day slots equally across the horizontal grid axis.
 */
export const CalendarWeek = UICalendar.Week;

/**
 * Interactive day cell touch target handling user tap and range interactions.
 * Visualizes current selection, range boundaries, today highlight, and disabled
 * states.
 */
export const CalendarDay = UICalendar.Day;

/**
 * Text node displaying the day of the month number inside a CalendarDay cell.
 * Adapts typography color and font weight to active selection and range
 * states.
 */
export const CalendarDayText = UICalendar.DayText;

/**
 * Event marker indicator container rendering dots or period badges under dates.
 * Signals scheduled transactions, deadlines, or user reminders on specific
 * days.
 */
export const CalendarDayIndicator = UICalendar.DayIndicator;

/**
 * Optional numerical label identifying the sequential calendar week of the
 * year. Positioned along the left margin of each week row for business schedule
 * clarity.
 */
export const CalendarWeekNumber = UICalendar.WeekNumber;

/**
 * Bottom action compartment housing auxiliary actions like today jump or clear
 * triggers. Provides visual separation beneath the calendar date grid.
 */
export const CalendarFooter = UICalendar.Footer;

// Re-export types
export type {
  CalendarMarker,
  CalendarMarkers,
  CalendarMode,
  DayState,
  ICalendarProps,
} from "@gluestack-ui/core/calendar/creator";

export type { CalendarProps };
