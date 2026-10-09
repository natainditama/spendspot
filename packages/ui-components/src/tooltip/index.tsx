import { styled, withStaticProperties } from "@tamagui/core";
import type { GetProps } from "@tamagui/core";
import { SizableText } from "@tamagui/text";
import { Tooltip as TamaguiTooltip, TooltipGroup } from "@tamagui/tooltip";
import type { TooltipProps as TamaguiTooltipProps } from "@tamagui/tooltip";
import React from "react";

export type TooltipProviderProps = Partial<React.ComponentPropsWithoutRef<typeof TooltipGroup>> & {
  delayDuration?: number;
};

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
    <TooltipGroup delay={resolvedDelay} {...props}>
      {children}
    </TooltipGroup>
  );
};
TooltipProvider.displayName = "TooltipProvider";

/**
 * Root container coordinating hover/focus state for a floating tooltip label.
 * Manages presentation timing, positioning calculations, and accessibility.
 */
export const TooltipRoot = (props: React.ComponentPropsWithoutRef<typeof TamaguiTooltip>) => {
  return <TamaguiTooltip {...props} />;
};

TooltipRoot.displayName = "TooltipRoot";
export type TooltipRootProps = React.ComponentPropsWithoutRef<typeof TamaguiTooltip>;

/**
 * Target element triggering the tooltip floating label on hover or long-press.
 * Unstyled trigger delegating focus and hover interactions to the tooltip.
 */
export const TooltipTrigger = (props: React.ComponentPropsWithoutRef<typeof TamaguiTooltip.Trigger>) => {
  return <TamaguiTooltip.Trigger {...props} />;
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
  zIndex: 50,
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
 * Composite Tooltip component for displaying accessible contextual helper text.
 * Supports compound syntax as well as flat individual named sub-component exports.
 */
export const Tooltip = withStaticProperties(TooltipRoot, {
  Trigger: TooltipTrigger,
  Content: TooltipContent,
  Provider: TooltipProvider,
});

Tooltip.displayName = "Tooltip";
export type TooltipProps = TamaguiTooltipProps;
