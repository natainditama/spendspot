import React, {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import GorhomBottomSheet, {
  BottomSheetBackdrop as GorhomBottomSheetBackdrop,
  BottomSheetFlatList as GorhomBottomSheetFlatList,
  BottomSheetFooter as GorhomBottomSheetFooter,
  BottomSheetHandle as GorhomBottomSheetHandle,
  BottomSheetTextInput as GorhomBottomSheetInput,
  BottomSheetScrollView as GorhomBottomSheetScrollView,
  BottomSheetSectionList as GorhomBottomSheetSectionList,
  BottomSheetView as GorhomBottomSheetView,
} from "@gorhom/bottom-sheet";
import {
  Keyboard,
  StyleSheet,
  Text,
  View,
  type PressableProps,
  type TextInputProps,
  type TextProps,
  Pressable as RNPressable,
} from "react-native";

type BottomSheetContextValue = {
  bottomSheetRef: React.RefObject<GorhomBottomSheet | null>;
  handleClose: () => void;
  handleOpen: (index?: number) => void;
  isVisible: boolean;
  handleSheetChanges: (index: number) => void;
  currentIndex: number;
};

const BottomSheetContext = createContext<BottomSheetContextValue>({
  bottomSheetRef: { current: null },
  handleClose: () => {},
  handleOpen: () => {},
  isVisible: false,
  handleSheetChanges: () => {},
  currentIndex: -1,
});

export type BottomSheetRef = {
  open: (index?: number) => void;
  close: () => void;
  snapToIndex: (index: number) => void;
  expand: () => void;
  collapse: () => void;
};

export interface BottomSheetProps {
  defaultSnapIndex?: number;
  children?: React.ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
  onChange?: (index: number) => void;
}

/**
 * Root provider coordinating bottom sheet visibility, snap indices, and
 * imperative ref handlers.
 */
export const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(
  ({ defaultSnapIndex = 0, onOpen, onClose, onChange, children }, ref) => {
    const bottomSheetRef = useRef<GorhomBottomSheet>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(-1);

    const handleOpen = useCallback(
      (index?: number) => {
        const targetIndex = index ?? defaultSnapIndex;
        setCurrentIndex(targetIndex);
        setIsVisible(true);
        onOpen?.();
      },
      [defaultSnapIndex, onOpen]
    );

    const handleClose = useCallback(() => {
      Keyboard.dismiss();
      setCurrentIndex(-1);
    }, []);

    const handleSheetChanges = useCallback(
      (index: number) => {
        setCurrentIndex(index);
        onChange?.(index);
        if (index === -1) {
          setIsVisible(false);
          onClose?.();
        } else {
          setIsVisible(true);
        }
      },
      [onClose, onChange]
    );

    const snapToIndex = useCallback((index: number) => {
      if (bottomSheetRef.current) {
        bottomSheetRef.current.snapToIndex(index);
      } else {
        setCurrentIndex(index);
        setIsVisible(true);
      }
    }, []);

    const expand = useCallback(() => {
      bottomSheetRef.current?.expand();
    }, []);

    const collapse = useCallback(() => {
      bottomSheetRef.current?.collapse();
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        open: handleOpen,
        close: handleClose,
        snapToIndex,
        expand,
        collapse,
      }),
      [handleOpen, handleClose, snapToIndex, expand, collapse]
    );

    const contextValue = useMemo(
      () => ({
        bottomSheetRef,
        handleClose,
        handleOpen,
        isVisible,
        handleSheetChanges,
        currentIndex,
      }),
      [handleClose, handleOpen, isVisible, handleSheetChanges, currentIndex]
    );

    return <BottomSheetContext.Provider value={contextValue}>{children}</BottomSheetContext.Provider>;
  }
);

export interface BottomSheetPortalProps extends Omit<React.ComponentProps<typeof GorhomBottomSheet>, "ref" | "index"> {
  className?: string;
  backgroundClassName?: string;
  handleIndicatorClassName?: string;
}

/**
 * Portaled sheet overlay mounting the native gesture-driven bottom sheet to
 * root portals.
 */
export const BottomSheetPortal = ({
  enablePanDownToClose = true,
  enableDynamicSizing = false,
  snapPoints,
  onChange,
  children,
  ...props
}: BottomSheetPortalProps) => {
  const { bottomSheetRef, handleSheetChanges, isVisible, currentIndex } = useContext(BottomSheetContext);

  const snapPointsKey = JSON.stringify(snapPoints);
  const memoizedSnapPoints = useMemo(
    () => snapPoints,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [snapPointsKey]
  );

  if (!isVisible) return null;

  const snapPointsArray = Array.isArray(memoizedSnapPoints) ? memoizedSnapPoints : undefined;
  const validIndex =
    snapPointsArray && snapPointsArray.length > 0 ? Math.min(currentIndex, snapPointsArray.length - 1) : currentIndex;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      <GorhomBottomSheet
        ref={bottomSheetRef}
        snapPoints={memoizedSnapPoints}
        index={validIndex}
        enableDynamicSizing={enableDynamicSizing}
        onChange={(idx, position, type) => {
          handleSheetChanges(idx);
          (onChange as any)?.(idx, position, type);
        }}
        enablePanDownToClose={enablePanDownToClose}
        backgroundStyle={styles.sheetBackground}
        handleIndicatorStyle={styles.handleIndicator}
        {...props}
      >
        {children}
      </GorhomBottomSheet>
    </View>
  );
};

export interface BottomSheetTriggerProps extends PressableProps {
  index?: number;
  className?: string;
}

/**
 * Interactive pressable trigger that expands the bottom sheet upon user
 * interaction.
 */
export const BottomSheetTrigger = ({ index, onPress, children, style, ...props }: BottomSheetTriggerProps) => {
  const { handleOpen } = useContext(BottomSheetContext);
  return (
    <RNPressable
      {...props}
      style={style}
      onPress={(e) => {
        onPress?.(e);
        handleOpen(index);
      }}
    >
      {children}
    </RNPressable>
  );
};

export interface BottomSheetBackdropProps extends Partial<React.ComponentProps<typeof GorhomBottomSheetBackdrop>> {
  className?: string;
}

/** Dimmed backdrop beneath the active bottom sheet. */
export const BottomSheetBackdrop = ({
  disappearsOnIndex = -1,
  appearsOnIndex = 0,
  opacity = 0.5,
  pressBehavior = "close",
  ...props
}: BottomSheetBackdropProps) => {
  return (
    <GorhomBottomSheetBackdrop
      disappearsOnIndex={disappearsOnIndex}
      appearsOnIndex={appearsOnIndex}
      opacity={opacity}
      pressBehavior={pressBehavior}
      {...(props as any)}
    />
  );
};

export interface BottomSheetDragIndicatorProps extends Partial<React.ComponentProps<typeof GorhomBottomSheetHandle>> {
  className?: string;
  indicatorClassName?: string;
}

/** Drag handle component anchored to top apex of bottom sheet. */
export const BottomSheetDragIndicator = ({ children, ...props }: BottomSheetDragIndicatorProps) => {
  return <GorhomBottomSheetHandle {...(props as any)}>{children}</GorhomBottomSheetHandle>;
};

export interface BottomSheetContentProps extends React.ComponentProps<typeof GorhomBottomSheetView> {
  className?: string;
  focusScope?: boolean;
}

/** Main sheet content container wrapping children. */
export const BottomSheetContent = ({ children, style, ...props }: BottomSheetContentProps) => {
  return (
    <GorhomBottomSheetView style={[{ paddingHorizontal: 16, gap: 8 }, style]} {...props}>
      {children}
    </GorhomBottomSheetView>
  );
};

export interface BottomSheetFooterProps extends React.ComponentProps<typeof GorhomBottomSheetFooter> {
  className?: string;
}

/** Sticky bottom sheet footer container. */
export const BottomSheetFooter = ({ children, style, ...props }: BottomSheetFooterProps) => {
  return (
    <GorhomBottomSheetFooter
      style={StyleSheet.flatten([{ padding: 16, borderTopWidth: 1, borderTopColor: "#e5e7eb" }, style])}
      {...props}
    >
      {children}
    </GorhomBottomSheetFooter>
  );
};

export interface BottomSheetItemProps extends PressableProps {
  closeOnSelect?: boolean;
  className?: string;
}

/** Interactive list option row inside bottom sheet. */
export const BottomSheetItem = ({ children, closeOnSelect = true, onPress, style, ...props }: BottomSheetItemProps) => {
  const { handleClose } = useContext(BottomSheetContext);

  return (
    <RNPressable
      {...props}
      style={(state) => [
        {
          padding: 12,
          flexDirection: "row",
          alignItems: "center",
          borderRadius: 6,
          backgroundColor: state.pressed ? "rgba(0,0,0,0.05)" : "transparent",
        },
        typeof style === "function" ? style(state) : style,
      ]}
      onPress={(e) => {
        onPress?.(e);
        if (closeOnSelect) {
          handleClose();
        }
      }}
    >
      {children}
    </RNPressable>
  );
};

export interface BottomSheetItemTextProps extends TextProps {
  className?: string;
}

/** Primary descriptive label for a BottomSheetItem. */
export const BottomSheetItemText = ({ children, style, ...props }: BottomSheetItemTextProps) => {
  return (
    <Text style={[{ fontSize: 14, color: "#111827" }, style]} {...props}>
      {children}
    </Text>
  );
};

export const BottomSheetTextInput = (props: TextInputProps) => {
  return (
    <GorhomBottomSheetInput
      style={{ height: 40, paddingHorizontal: 12, borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 6 }}
      {...props}
    />
  );
};

export const BottomSheetScrollView = GorhomBottomSheetScrollView;
export const BottomSheetFlatList = GorhomBottomSheetFlatList;
export const BottomSheetSectionList = GorhomBottomSheetSectionList;

const styles = StyleSheet.create({
  sheetBackground: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  handleIndicator: {
    backgroundColor: "#9ca3af",
    width: 36,
    height: 4,
  },
});

BottomSheet.displayName = "BottomSheet";
