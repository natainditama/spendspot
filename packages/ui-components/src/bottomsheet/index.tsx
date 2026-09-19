"use client";

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
import { FocusScope } from "@gluestack-ui/utils/aria";
import { tva } from "@gluestack-ui/utils/nativewind-utils";
import { Overlay } from "@gluestack-ui/core/overlay/creator";
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
import { styled } from "nativewind";
import {
  Keyboard,
  Platform,
  Text,
  View,
  type PressableProps,
  type TextInputProps,
  type TextProps,
  Pressable as RNPressable,
} from "react-native";
import { Pressable as GGHPressable } from "react-native-gesture-handler";

/**
 * Backdrop overlay styling obscuring background application screens during
 * sheet presentation. Positions a fixed semi-transparent scrim with dimming
 * animation support.
 */
const bottomSheetBackdropStyle = tva({
  base: "absolute inset-0 bg-black opacity-50",
});

/**
 * Main sheet container body styling defining horizontal padding and item gaps.
 * Houses sheet content with standardized vertical rhythm and edge spacing.
 */
const bottomSheetContentStyle = tva({
  base: "px-4 gap-2",
});

/**
 * Interactive touch target styling for elements that trigger sheet expansion.
 * Configures touch bounds, border radii, and surface styling for sheet
 * openers.
 */
const bottomSheetTriggerStyle = tva({
  base: "p-4 rounded-lg border border-border/90",
});

/**
 * Handle container styling positioned at the top of the sliding bottom sheet.
 * Centers the visual drag indicator and rounds upper sheet borders.
 */
const bottomSheetHandleStyle = tva({
  base: "py-3 w-full items-center rounded-t-xl",
});

/**
 * Interactive list item row styling inside bottom sheet options menus.
 * Accommodates press states, hover feedback, and disabled accessibility
 * attributes.
 */
const bottomSheetItemStyle = tva({
  base: "p-3 flex-row items-center rounded-sm w-full disabled:opacity-40 web:pointer-events-auto disabled:cursor-not-allowed hover:bg-accent/40 active:bg-accent/50 data-[focus=true]:bg-accent/20 web:data-[focus-visible=true]:bg-accent/40",
});

/**
 * Typographic styling for label text inside bottom sheet interactive item rows.
 * Formats clean body typography with high-contrast text foreground colors.
 */
const bottomSheetItemTextStyle = tva({
  base: "text-foreground font-normal text-sm",
});

/**
 * Bottom action bar container styling pinned to the lower edge of the sheet.
 * Provides border separation and padding for confirmation buttons and sticky
 * controls.
 */
const bottomSheetFooterStyle = tva({
  base: "p-4 border-t border-border/90",
});

/**
 * Input field styling adapted for text inputs rendered within draggable bottom
 * sheets. Resolves keyboard scrolling, border highlights, and dark-mode input
 * contrast.
 */
const bottomSheetTextInputStyle = tva({
  base: "flex-1 text-foreground text-sm md:text-sm py-1 placeholder:text-muted-foreground  web:outline-none ios:leading-[0px] web:cursor-text  h-9 w-full flex-row items-center rounded-md border border-border dark:bg-input/30 bg-transparent shadow-xs overflow-hidden px-3 gap-2",
});

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

type IBottomSheetRootProps = {
  defaultSnapIndex?: number;
  children?: React.ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
  onChange?: (index: number) => void;
};

/**
 * Root provider coordinating bottom sheet visibility, snap indices, and
 * imperative ref handlers. Wraps sheet triggers and modal portals with a
 * unified state controller context.
 */
export const BottomSheet = forwardRef<BottomSheetRef, IBottomSheetRootProps>(
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

BottomSheet.displayName = "BottomSheet";

const StyledGorhomBottomSheet = styled(GorhomBottomSheet, {
  className: "style",
  backgroundClassName: "backgroundStyle",
  handleIndicatorClassName: "handleIndicatorStyle",
});

type IBottomSheetPortalProps = Omit<React.ComponentProps<typeof GorhomBottomSheet>, "ref" | "index"> & {
  className?: string;
  backgroundClassName?: string;
  handleIndicatorClassName?: string;
};

/**
 * Portaled sheet overlay mounting the native gesture-driven bottom sheet to
 * root portals. Manages snap height animations, defensive index clamping, and
 * overlay background surfaces.
 */
export const BottomSheetPortal = ({
  className,
  backgroundClassName,
  handleIndicatorClassName,
  enablePanDownToClose = true,
  enableDynamicSizing = false,
  snapPoints,
  onChange,
  ...props
}: IBottomSheetPortalProps) => {
  const { bottomSheetRef, handleSheetChanges, isVisible, currentIndex } = useContext(BottomSheetContext);

  const snapPointsKey = JSON.stringify(snapPoints);
  const memoizedSnapPoints = useMemo(
    () => snapPoints,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [snapPointsKey]
  );

  if (!isVisible) return null;

  // Defensive index check to prevent Invariant Violation
  const snapPointsArray = Array.isArray(memoizedSnapPoints) ? memoizedSnapPoints : undefined;
  const validIndex =
    snapPointsArray && snapPointsArray.length > 0 ? Math.min(currentIndex, snapPointsArray.length - 1) : currentIndex;

  return (
    <Overlay isOpen={true} isKeyboardDismissable={false} style={{ flex: 1 }}>
      <StyledGorhomBottomSheet
        ref={bottomSheetRef}
        snapPoints={memoizedSnapPoints}
        index={validIndex}
        enableDynamicSizing={enableDynamicSizing}
        onChange={(idx, position, type) => {
          handleSheetChanges(idx);
          (onChange as any)?.(idx, position, type);
        }}
        enablePanDownToClose={enablePanDownToClose}
        // @ts-ignore
        className={className}
        // @ts-ignore
        backgroundClassName={`${backgroundClassName} bg-background border border-border/90 rounded-xl`}
        // @ts-ignore
        handleIndicatorClassName={`${handleIndicatorClassName} bg-primary`}
        {...props}
      >
        {props.children}
      </StyledGorhomBottomSheet>
    </Overlay>
  );
};

/**
 * Interactive pressable trigger that expands the bottom sheet upon user
 * interaction. Wires press events to context sheet open handlers with optional
 * target snap indices.
 */
export const BottomSheetTrigger = ({
  className,
  index,
  onPress,
  ...props
}: PressableProps & { className?: string; index?: number }) => {
  const { handleOpen } = useContext(BottomSheetContext);
  return (
    <RNPressable
      {...props}
      onPress={(e) => {
        onPress?.(e);
        handleOpen(index);
      }}
      className={bottomSheetTriggerStyle({ className })}
    >
      {props.children}
    </RNPressable>
  );
};

type IBottomSheetBackdropProps = React.ComponentProps<typeof GorhomBottomSheetBackdrop> & {
  className?: string;
};

/**
 * Animated backdrop scrim dimming background content beneath the active bottom
 * sheet. Fades in synchronously with sheet expansion and handles tap-to-close
 * gestures.
 */
export const BottomSheetBackdrop = ({
  disappearsOnIndex = -1,
  appearsOnIndex = 0,
  opacity = 0.5,
  className,
  pressBehavior = "close",
  ...props
}: Partial<IBottomSheetBackdropProps>) => {
  return (
    <GorhomBottomSheetBackdrop
      // @ts-ignore
      className={bottomSheetBackdropStyle({ className })}
      disappearsOnIndex={disappearsOnIndex}
      appearsOnIndex={appearsOnIndex}
      opacity={opacity}
      pressBehavior={pressBehavior}
      {...(props as any)}
    />
  );
};

const StyledGorhomBottomSheetHandle = styled(GorhomBottomSheetHandle, {
  className: "style",
});

type IBottomSheetHandleProps = React.ComponentProps<typeof GorhomBottomSheetHandle> & {
  className?: string;
  indicatorClassName?: string;
};

/**
 * Drag handle component anchored to the top apex of the bottom sheet. Renders a
 * visual grab pill affording vertical pan gestures to resize or dismiss.
 */
export const BottomSheetDragIndicator = ({
  children,
  className,
  indicatorClassName,
  ...props
}: Partial<IBottomSheetHandleProps>) => {
  return (
    <StyledGorhomBottomSheetHandle
      {...(props as any)}
      // @ts-ignore
      className={bottomSheetHandleStyle({ className })}
    >
      {children}
    </StyledGorhomBottomSheetHandle>
  );
};

const StyledGorhomBottomSheetView = styled(GorhomBottomSheetView, {
  className: "style",
});

type IBottomSheetContentProps = React.ComponentProps<typeof GorhomBottomSheetView> & {
  className?: string;
  focusScope?: boolean;
};

/**
 * Main sheet content container wrapping children with accessible focus
 * isolation. Automatically handles escape key dismissal on web and manages
 * content paddings.
 */
export const BottomSheetContent = ({ className, focusScope = true, ...props }: IBottomSheetContentProps) => {
  const { handleClose, isVisible } = useContext(BottomSheetContext);

  const keyDownHandlers = useMemo(() => {
    if (Platform.OS !== "web") return {};
    return {
      onKeyDown: (e: React.KeyboardEvent) => {
        if (e.key === "Escape") {
          e.preventDefault();
          handleClose();
        }
      },
    };
  }, [handleClose]);

  const content = props.children;
  const wrappedContent =
    Platform.OS === "web" && isVisible && focusScope ? (
      <FocusScope contain={isVisible} autoFocus restoreFocus>
        {content}
      </FocusScope>
    ) : (
      content
    );

  return (
    <StyledGorhomBottomSheetView
      {...props}
      // @ts-ignore
      {...keyDownHandlers}
      // @ts-ignore
      className={bottomSheetContentStyle({ className })}
    >
      {wrappedContent}
    </StyledGorhomBottomSheetView>
  );
};

type IBottomSheetFooterProps = React.ComponentProps<typeof GorhomBottomSheetFooter> & {
  className?: string;
  children?: React.ReactNode;
};

/**
 * Sticky bottom sheet footer container anchored to the bottom perimeter.
 * Provides a dedicated compartment for primary confirmation and action
 * triggers.
 */
export const BottomSheetFooter = ({ className, children, ...props }: IBottomSheetFooterProps) => {
  return (
    <GorhomBottomSheetFooter {...props}>
      <View
        // @ts-ignore
        className={bottomSheetFooterStyle({ className })}
      >
        {children}
      </View>
    </GorhomBottomSheetFooter>
  );
};

type IBottomSheetItemProps = PressableProps & {
  className?: string;
  closeOnSelect?: boolean;
};

const StyledGGHPressable = styled(GGHPressable as any, {
  className: "style",
});

/**
 * Interactive list option item inside a bottom sheet menu or action selector.
 * Provides touch feedback and optionally triggers sheet closure upon
 * selection.
 */
export const BottomSheetItem = ({ children, className, closeOnSelect = true, ...props }: IBottomSheetItemProps) => {
  const { handleClose } = useContext(BottomSheetContext);

  const PressableComponent = (Platform.OS === "web" ? RNPressable : StyledGGHPressable) as any;

  return (
    <PressableComponent
      {...props}
      // @ts-ignore
      className={bottomSheetItemStyle({ className })}
      onPress={(e: any) => {
        props.onPress?.(e);
        if (closeOnSelect) {
          handleClose();
        }
      }}
      role="button"
      accessibilityRole="button"
    >
      {children}
    </PressableComponent>
  );
};

type IBottomSheetItemTextProps = TextProps & {
  className?: string;
};

/**
 * Text node rendering the primary descriptive label for a BottomSheetItem.
 * Ensures consistent typography scale and readable foreground color contrast.
 */
export const BottomSheetItemText = ({ className, ...props }: IBottomSheetItemTextProps) => {
  return <Text {...props} className={bottomSheetItemTextStyle({ className })} />;
};

const StyledGorhomBottomSheetInput = styled(GorhomBottomSheetInput, {
  className: "style",
});

/**
 * Form text input component optimized for native bottom sheet gesture contexts.
 * Maintains correct keyboard avoidance and viewport offsets inside sliding
 * sheets.
 */
export const BottomSheetTextInput = ({ className, ...props }: TextInputProps) => {
  return (
    <StyledGorhomBottomSheetInput
      {...props}
      // @ts-ignore
      className={bottomSheetTextInputStyle({ className })}
    />
  );
};

/**
 * Native scrollable container integrated with bottom sheet pan gesture
 * responders. Enables smooth fluid scrolling within sheet content without
 * blocking drag-to-dismiss.
 */
export const BottomSheetScrollView = GorhomBottomSheetScrollView;

/**
 * High-performance virtualized flat list tailored for large datasets in bottom
 * sheets. Coexists cleanly with sheet pan responders to deliver stutter-free
 * 60fps scrolling.
 */
export const BottomSheetFlatList = GorhomBottomSheetFlatList;

/**
 * High-performance sectioned list supporting grouped data collections inside
 * sheets. Coordinates sticky headers and gesture interactions with bottom sheet
 * drag limits.
 */
export const BottomSheetSectionList = GorhomBottomSheetSectionList;
