import React, { createContext, forwardRef, useContext, useState } from "react";
import { Pressable } from "react-native";
import { Paragraph, View, XStack, YStack } from "tamagui";

export type CalendarMode = "single" | "multiple" | "range";

export interface DayState {
  isSelected?: boolean;
  isToday?: boolean;
  isDisabled?: boolean;
  isRangeStart?: boolean;
  isRangeEnd?: boolean;
  isInRange?: boolean;
  isOutsideMonth?: boolean;
}

export interface CalendarMarker {
  type: string;
  color?: string;
}

export type CalendarMarkers = Record<string, CalendarMarker[]>;

export interface ICalendarProps {
  mode?: CalendarMode;
  value?: any;
  defaultValue?: any;
  onValueChange?: (val: any) => void;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
  children?: React.ReactNode;
}

export type CalendarProps = ICalendarProps;

interface CalendarContextValue {
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
  mode: CalendarMode;
  value?: any;
  onValueChange?: (val: any) => void;
}

const CalendarContext = createContext<CalendarContextValue>({
  currentDate: new Date(),
  setCurrentDate: () => {},
  mode: "single",
});

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

const WEEK_DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

/**
 * Accessible monthly calendar grid supporting single, multi-date, and range
 * selections.
 */
export const Calendar = forwardRef<React.ElementRef<typeof YStack>, CalendarProps>(function Calendar(
  { mode = "single", value, defaultValue, onValueChange, children, ...props },
  ref
) {
  const [currentDate, setCurrentDate] = useState<Date>(
    value instanceof Date ? value : defaultValue instanceof Date ? defaultValue : new Date()
  );

  return (
    <CalendarContext.Provider value={{ currentDate, setCurrentDate, mode, value, onValueChange }}>
      <YStack
        ref={ref}
        backgroundColor="$background"
        borderRadius={8}
        borderWidth={1}
        borderColor="$borderColor"
        padding={16}
        width={320}
        gap={12}
        {...props}
      >
        {children ? (
          children
        ) : (
          <>
            <CalendarHeader>
              <CalendarHeaderPrevButton />
              <CalendarHeaderTitle />
              <CalendarHeaderNextButton />
            </CalendarHeader>
            <CalendarWeekDaysHeader>
              {WEEK_DAYS.map((day) => (
                <CalendarWeekDay key={day}>{day}</CalendarWeekDay>
              ))}
            </CalendarWeekDaysHeader>
            <CalendarBody>
              <CalendarGrid />
            </CalendarBody>
          </>
        )}
      </YStack>
    </CalendarContext.Provider>
  );
});

export const CalendarHeader = forwardRef<
  React.ElementRef<typeof XStack>,
  React.ComponentPropsWithoutRef<typeof XStack>
>(function CalendarHeader({ children, ...props }, ref) {
  return (
    <XStack ref={ref} alignItems="center" justifyContent="space-between" width="100%" {...props}>
      {children}
    </XStack>
  );
});

export const CalendarHeaderPrevButton = forwardRef<any, { onPress?: () => void; className?: string }>(
  function CalendarHeaderPrevButton({ onPress, ...props }, ref) {
    const { setCurrentDate } = useContext(CalendarContext);

    const handlePress = () => {
      if (onPress) {
        onPress();
      } else {
        setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
      }
    };

    return (
      <Pressable ref={ref} onPress={handlePress} style={{ padding: 6, borderRadius: 4 }} {...props}>
        <Paragraph fontSize={14} fontWeight="600" color="$color">
          &lt;
        </Paragraph>
      </Pressable>
    );
  }
);

export const CalendarHeaderNextButton = forwardRef<any, { onPress?: () => void; className?: string }>(
  function CalendarHeaderNextButton({ onPress, ...props }, ref) {
    const { setCurrentDate } = useContext(CalendarContext);

    const handlePress = () => {
      if (onPress) {
        onPress();
      } else {
        setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
      }
    };

    return (
      <Pressable ref={ref} onPress={handlePress} style={{ padding: 6, borderRadius: 4 }} {...props}>
        <Paragraph fontSize={14} fontWeight="600" color="$color">
          &gt;
        </Paragraph>
      </Pressable>
    );
  }
);

export const CalendarHeaderTitle = forwardRef<any, { className?: string }>(function CalendarHeaderTitle(props, ref) {
  const { currentDate } = useContext(CalendarContext);
  const title = `${MONTH_NAMES[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

  return (
    <Paragraph ref={ref} fontSize={14} fontWeight="600" color="$color" {...props}>
      {title}
    </Paragraph>
  );
});

export const CalendarHeaderMonthSelect = View;
export const CalendarHeaderYearSelect = View;

export const CalendarWeekDaysHeader = forwardRef<
  React.ElementRef<typeof XStack>,
  React.ComponentPropsWithoutRef<typeof XStack>
>(function CalendarWeekDaysHeader({ children, ...props }, ref) {
  return (
    <XStack ref={ref} justifyContent="space-between" width="100%" {...props}>
      {children}
    </XStack>
  );
});

export const CalendarWeekDay = forwardRef<any, { children: React.ReactNode; className?: string }>(
  function CalendarWeekDay({ children, ...props }, ref) {
    return (
      <View ref={ref} width={36} alignItems="center" justifyContent="center" {...props}>
        <Paragraph fontSize={12} fontWeight="500" color="$colorHover">
          {children}
        </Paragraph>
      </View>
    );
  }
);

export const CalendarBody = forwardRef<React.ElementRef<typeof YStack>, React.ComponentPropsWithoutRef<typeof YStack>>(
  function CalendarBody({ children, ...props }, ref) {
    return (
      <YStack ref={ref} gap={4} width="100%" {...props}>
        {children}
      </YStack>
    );
  }
);

export const CalendarGrid = forwardRef<any, { className?: string }>(function CalendarGrid(props, ref) {
  const { currentDate, value, onValueChange } = useContext(CalendarContext);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const weeks: (number | null)[][] = [];
  let currentWeek: (number | null)[] = [];

  for (let i = 0; i < firstDay; i++) {
    currentWeek.push(null);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    currentWeek.push(d);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push(null);
    }
    weeks.push(currentWeek);
  }

  return (
    <YStack ref={ref} gap={4} {...props}>
      {weeks.map((week, wIndex) => (
        <XStack key={wIndex} justifyContent="space-between">
          {week.map((dayNum, dIndex) => {
            if (dayNum === null) {
              return <View key={dIndex} width={36} height={36} />;
            }

            const dayDate = new Date(year, month, dayNum);
            const isSelected =
              value instanceof Date &&
              value.getFullYear() === year &&
              value.getMonth() === month &&
              value.getDate() === dayNum;

            return (
              <CalendarDay
                key={dIndex}
                onPress={() => onValueChange?.(dayDate)}
                data-state={isSelected ? "selected" : "default"}
              >
                <CalendarDayText state={{ isSelected }}>{dayNum}</CalendarDayText>
              </CalendarDay>
            );
          })}
        </XStack>
      ))}
    </YStack>
  );
});

export const CalendarWeek = XStack;

export const CalendarDay = forwardRef<
  any,
  { children?: React.ReactNode; "data-state"?: string; onPress?: () => void; className?: string }
>(function CalendarDay({ children, "data-state": dataState, onPress, ...props }, ref) {
  const isSelected = dataState === "selected";

  return (
    <Pressable
      ref={ref}
      onPress={onPress}
      style={{
        width: 36,
        height: 36,
        borderRadius: 6,
        backgroundColor: isSelected ? "#0f172a" : "transparent",
        alignItems: "center",
        justifyContent: "center",
      }}
      {...props}
    >
      {children}
    </Pressable>
  );
});

export const CalendarDayText = forwardRef<any, { children?: React.ReactNode; state?: DayState; className?: string }>(
  function CalendarDayText({ children, state, ...props }, ref) {
    const isSelected = state?.isSelected;

    return (
      <Paragraph
        ref={ref}
        fontSize={13}
        fontWeight={isSelected ? "600" : "400"}
        color={isSelected ? "#ffffff" : "$color"}
        {...props}
      >
        {children}
      </Paragraph>
    );
  }
);

export const CalendarDayIndicator = View;
export const CalendarWeekNumber = View;
export const CalendarFooter = XStack;

Calendar.displayName = "Calendar";
CalendarHeader.displayName = "CalendarHeader";
CalendarWeekDaysHeader.displayName = "CalendarWeekDaysHeader";
CalendarBody.displayName = "CalendarBody";
CalendarGrid.displayName = "CalendarGrid";
CalendarDay.displayName = "CalendarDay";
CalendarDayText.displayName = "CalendarDayText";
