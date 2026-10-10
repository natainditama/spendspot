import { styled, withStaticProperties } from "@tamagui/core";
import type { GetProps } from "@tamagui/core";
import { SizableText } from "@tamagui/text";
import { Tooltip as TamaguiTooltip, TooltipGroup as TamaguiTooltipGroup } from "@tamagui/tooltip";
import type { TooltipProps as TamaguiTooltipProps } from "@tamagui/tooltip";
import React from "react";

/**
 * Global provider coordinating hover delays and grouped tooltip behavior.
 * Synchronizes appearance timing across adjacent tooltip trigger targets.
 */
export const TooltipProvider = ({
  delay = { open: 500, close: 200 },
  delayDuration,
  children,
  ...props
}: TooltipProviderProps) => {
  const resolvedDelay = delayDuration !== undefined ? delayDuration : delay;

  return (
    <TamaguiTooltipGroup delay={resolvedDelay} {...props}>
      {children}
    </TamaguiTooltipGroup>
  );
};

TooltipProvider.displayName = "TooltipProvider";
export type TooltipProviderProps = Partial<React.ComponentPropsWithoutRef<typeof TamaguiTooltipGroup>> & {
  delayDuration?: number;
};

interface TooltipContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
}

const TooltipContext = React.createContext<TooltipContextValue>({
  open: false,
  setOpen: () => {},
  toggle: () => {},
});

/**
 * Root container coordinating hover/focus/tap state for a floating tooltip label.
 * Supports hover on desktop and tap-to-toggle with auto-dismiss on touch devices.
 */
export const TooltipRoot = ({ children, open: openProp, onOpenChange: onOpenChangeProp, ...props }: TooltipProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : uncontrolledOpen;
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const setOpen = React.useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(nextOpen);
      }
      onOpenChangeProp?.(nextOpen);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }

      // Auto-dismiss on mobile after 3 seconds when opened via press
      if (nextOpen) {
        timerRef.current = setTimeout(() => {
          if (!isControlled) {
            setUncontrolledOpen(false);
          }
          onOpenChangeProp?.(false);
        }, 3000);
      }
    },
    [isControlled, onOpenChangeProp]
  );

  const toggle = React.useCallback(() => {
    setOpen(!open);
  }, [open, setOpen]);

  React.useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <TooltipContext.Provider value={{ open, setOpen, toggle }}>
      <TamaguiTooltip open={open} onOpenChange={setOpen} {...props}>
        {children}
      </TamaguiTooltip>
    </TooltipContext.Provider>
  );
};

TooltipRoot.displayName = "TooltipRoot";
export type TooltipRootProps = TooltipProps;

/**
 * Target element triggering the tooltip floating label on hover or tap.
 * Automatically delegates press events to toggle tooltip presentation on touch devices.
 */
export const TooltipTrigger = ({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof TamaguiTooltip.Trigger>) => {
  const { toggle } = React.useContext(TooltipContext);

  return (
    <TamaguiTooltip.Trigger
      onPress={(e: any) => {
        toggle();
        (children as any)?.props?.onPress?.(e);
      }}
      {...props}
    >
      {children}
    </TamaguiTooltip.Trigger>
  );
};

TooltipTrigger.displayName = "TooltipTrigger";
export type TooltipTriggerProps = React.ComponentPropsWithoutRef<typeof TamaguiTooltip.Trigger>;

const TooltipContentFrame = styled(TamaguiTooltip.Content, {
  name: "TooltipContent",
  backgroundColor: "$foreground",
  borderRadius: "$md",
  paddingHorizontal: "$3",
  paddingVertical: "$1.5",
  elevation: "$3",
  zIndex: 1000,
});
TooltipContentFrame.displayName = "TooltipContentFrame";

/**
 * Floating label bubble displaying concise helper text adjacent to its trigger.
 * Styled with high-contrast foreground background and compact typography.
 */
export const TooltipContent = ({ children, ...props }: TooltipContentProps) => {
  return (
    <TooltipContentFrame {...props}>
      <TamaguiTooltip.Arrow backgroundColor="$foreground" />
      {typeof children === "string" || typeof children === "number" ? (
        <SizableText color="$background" fontSize="$xs" lineHeight="$xs">
          {children}
        </SizableText>
      ) : (
        children
      )}
    </TooltipContentFrame>
  );
};

TooltipContent.displayName = "TooltipContent";
export type TooltipContentProps = GetProps<typeof TooltipContentFrame>;

/**
 * Visual arrow indicator pointing toward the tooltip trigger target.
 * Automatically aligns with tooltip position and popover arrow geometry.
 */
export const TooltipArrow = (props: React.ComponentPropsWithoutRef<typeof TamaguiTooltip.Arrow>) => {
  return <TamaguiTooltip.Arrow backgroundColor="$foreground" {...props} />;
};

TooltipArrow.displayName = "TooltipArrow";
export type TooltipArrowProps = React.ComponentPropsWithoutRef<typeof TamaguiTooltip.Arrow>;

/**
 * Custom positioning anchor target separating trigger press from attachment point.
 * Used when tooltip bubble should attach to an element distinct from its trigger.
 */
export const TooltipAnchor = (props: React.ComponentPropsWithoutRef<typeof TamaguiTooltip.Anchor>) => {
  return <TamaguiTooltip.Anchor {...props} />;
};

TooltipAnchor.displayName = "TooltipAnchor";
export type TooltipAnchorProps = React.ComponentPropsWithoutRef<typeof TamaguiTooltip.Anchor>;

export const TooltipGroup = ({ children, ...props }: React.ComponentPropsWithoutRef<typeof TamaguiTooltipGroup>) => {
  return <TamaguiTooltipGroup {...props}>{children}</TamaguiTooltipGroup>;
};

TooltipGroup.displayName = "TooltipGroup";
export type TooltipGroupProps = React.ComponentPropsWithoutRef<typeof TamaguiTooltipGroup>;

/**
 * Composite Tooltip component for displaying accessible contextual helper text.
 * Supports compound syntax as well as flat individual named sub-component exports.
 */
export const Tooltip = withStaticProperties(TooltipRoot, {
  Trigger: TooltipTrigger,
  Content: TooltipContent,
  Arrow: TooltipArrow,
  Anchor: TooltipAnchor,
  Provider: TooltipProvider,
  Group: TooltipGroup,
});

Tooltip.displayName = "Tooltip";
export type TooltipProps = TamaguiTooltipProps;

export { closeOpenTooltips } from "@tamagui/tooltip";
