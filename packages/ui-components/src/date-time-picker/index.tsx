import React, { createContext, forwardRef, useCallback, useContext, useMemo, useState } from "react";
import { Modal, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import DateTimePickerNative from "@react-native-community/datetimepicker";
import { Paragraph, XStack } from "tamagui";

export type DateTimePickerMode = "date" | "time" | "datetime";

export interface DateTimePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  mode?: DateTimePickerMode;
  minimumDate?: Date;
  maximumDate?: Date;
  locale?: string;
  timeZoneOffsetInMinutes?: number;
  is24Hour?: boolean;
  disabled?: boolean;
  placeholder?: string;
  format?: string;
  display?: "modal" | "inline";
  children?: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "outline" | "rounded" | "underlined";
}

interface DateTimePickerContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  mode: DateTimePickerMode;
  disabled: boolean;
  placeholder: string;
  format?: string;
  size: "sm" | "md" | "lg";
  variant: "outline" | "rounded" | "underlined";
}

const DateTimePickerContext = createContext<DateTimePickerContextValue>({
  isOpen: false,
  setIsOpen: () => {},
  mode: "date",
  disabled: false,
  placeholder: "Select date",
  size: "md",
  variant: "outline",
});

function formatDate(date: Date, format: string): string {
  const pad = (n: number) => n.toString().padStart(2, "0");
  return format
    .replace("YYYY", date.getFullYear().toString())
    .replace("MM", pad(date.getMonth() + 1))
    .replace("DD", pad(date.getDate()))
    .replace("HH", pad(date.getHours()))
    .replace("mm", pad(date.getMinutes()))
    .replace("ss", pad(date.getSeconds()));
}

/** Cross-platform date and time selection input component. */
export const DateTimePicker = forwardRef<any, DateTimePickerProps>(function DateTimePicker(
  {
    value,
    onChange,
    mode = "date",
    minimumDate,
    maximumDate,
    timeZoneOffsetInMinutes,
    is24Hour,
    disabled = false,
    placeholder = "Select date",
    format,
    display = "modal",
    children,
    size = "md",
    variant = "outline",
    ...props
  },
  ref
) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempValue, setTempValue] = useState<Date>(value || new Date());

  const handleNativeChange = useCallback(
    (_event: any, selectedDate?: Date) => {
      if (Platform.OS === "android") {
        setIsOpen(false);
      }
      if (selectedDate) {
        setTempValue(selectedDate);
        onChange?.(selectedDate);
      }
    },
    [onChange]
  );

  const handleDone = () => {
    setIsOpen(false);
    onChange?.(tempValue);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <DateTimePickerContext.Provider
      value={{
        isOpen,
        setIsOpen,
        value,
        onChange,
        mode,
        disabled,
        placeholder,
        format,
        size,
        variant,
      }}
    >
      <View ref={ref} {...props}>
        {children ? (
          children
        ) : (
          <DateTimePickerTrigger size={size} variant={variant}>
            <DateTimePickerInput />
          </DateTimePickerTrigger>
        )}

        {isOpen && Platform.OS === "ios" && (
          <Modal visible={isOpen} transparent animationType="slide" onRequestClose={handleCancel}>
            <View style={styles.modalOverlay}>
              <Pressable style={styles.backdrop} onPress={handleCancel} />
              <View style={styles.sheetContainer}>
                <View style={styles.header}>
                  <Pressable onPress={handleCancel}>
                    <Text style={styles.headerBtn}>Cancel</Text>
                  </Pressable>
                  <Text style={styles.headerTitle}>
                    {mode === "date" ? "Select Date" : mode === "time" ? "Select Time" : "Select Date & Time"}
                  </Text>
                  <Pressable onPress={handleDone}>
                    <Text style={styles.headerBtn}>Done</Text>
                  </Pressable>
                </View>
                <DateTimePickerNative
                  value={tempValue}
                  mode={mode}
                  display={display === "inline" ? "inline" : "spinner"}
                  minimumDate={minimumDate}
                  maximumDate={maximumDate}
                  timeZoneOffsetInMinutes={timeZoneOffsetInMinutes}
                  is24Hour={is24Hour}
                  onChange={handleNativeChange}
                />
              </View>
            </View>
          </Modal>
        )}

        {isOpen && Platform.OS === "android" && (
          <DateTimePickerNative
            value={value || new Date()}
            mode={mode === "datetime" ? "date" : mode}
            display="default"
            minimumDate={minimumDate}
            maximumDate={maximumDate}
            timeZoneOffsetInMinutes={timeZoneOffsetInMinutes}
            is24Hour={is24Hour}
            onChange={handleNativeChange}
          />
        )}
      </View>
    </DateTimePickerContext.Provider>
  );
});

export interface DateTimePickerTriggerProps extends React.ComponentPropsWithoutRef<typeof XStack> {
  size?: "sm" | "md" | "lg";
  variant?: "outline" | "rounded" | "underlined";
  className?: string;
}

/** Pressable trigger element opening the date and time picker dialog. */
export const DateTimePickerTrigger = forwardRef<React.ElementRef<typeof XStack>, DateTimePickerTriggerProps>(
  function DateTimePickerTrigger({ size: explicitSize, variant: explicitVariant, children, ...props }, ref) {
    const context = useContext(DateTimePickerContext);
    const size = explicitSize ?? context.size;
    const variant = explicitVariant ?? context.variant;
    const { disabled, setIsOpen } = context;

    const height = size === "sm" ? 36 : size === "lg" ? 48 : 42;
    const borderRadius = variant === "rounded" ? 9999 : variant === "underlined" ? 0 : 6;
    const borderWidth = variant === "underlined" ? 0 : 1;

    return (
      <XStack
        ref={ref}
        height={height}
        borderRadius={borderRadius}
        borderWidth={borderWidth}
        borderBottomWidth={1}
        borderColor="$borderColor"
        backgroundColor="$background"
        paddingHorizontal={12}
        alignItems="center"
        justifyContent="space-between"
        cursor={disabled ? "not-allowed" : "pointer"}
        opacity={disabled ? 0.5 : 1}
        onPress={() => !disabled && setIsOpen(true)}
        {...props}
      >
        {children}
      </XStack>
    );
  }
);

export interface DateTimePickerInputProps extends React.ComponentPropsWithoutRef<typeof Paragraph> {
  className?: string;
}

/** Formatted date string display inside the trigger boundary. */
export const DateTimePickerInput = forwardRef<React.ElementRef<typeof Paragraph>, DateTimePickerInputProps>(
  function DateTimePickerInput(props, ref) {
    const { value, placeholder, format } = useContext(DateTimePickerContext);

    const displayValue = useMemo(() => {
      if (!value) return placeholder;
      if (format) return formatDate(value, format);
      return value.toLocaleDateString();
    }, [value, placeholder, format]);

    const isPlaceholder = !value;

    return (
      <Paragraph ref={ref} color={isPlaceholder ? "$colorHover" : "$color"} fontSize={14} numberOfLines={1} {...props}>
        {displayValue}
      </Paragraph>
    );
  }
);

export interface DateTimePickerIconProps {
  as?: React.ElementType;
  size?: number | string;
  height?: number;
  width?: number;
  color?: string;
  className?: string;
  [key: string]: any;
}

/** Decorative calendar/clock icon rendered within the picker trigger. */
export const DateTimePickerIcon = forwardRef<any, DateTimePickerIconProps>(function DateTimePickerIcon(
  { as: Component, size = 16, height, width, color = "$color", ...props },
  ref
) {
  const dim = height ?? width ?? (typeof size === "number" ? size : 16);
  if (Component) {
    return <Component ref={ref} size={dim} width={dim} height={dim} color={color} {...props} />;
  }
  return null;
});

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    ...(StyleSheet.absoluteFill as object),
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  sheetContainer: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 12,
  },
  headerBtn: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2563eb",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
});

DateTimePicker.displayName = "DateTimePicker";
DateTimePickerTrigger.displayName = "DateTimePickerTrigger";
DateTimePickerInput.displayName = "DateTimePickerInput";
DateTimePickerIcon.displayName = "DateTimePickerIcon";
