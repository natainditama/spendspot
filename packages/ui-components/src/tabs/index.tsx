import { styled, withStaticProperties } from "@tamagui/core";
import type { GetProps } from "@tamagui/core";
import { Tabs as TamaguiTabs, useTabsContext } from "@tamagui/tabs";
import { SizableText } from "@tamagui/text";
import React from "react";

export type TabsListVariant = "default" | "line";

interface TabsListContextValue {
  variant: TabsListVariant;
}

const TabsListContext = React.createContext<TabsListContextValue>({
  variant: "default",
});

const TabsComponent = styled(TamaguiTabs, {
  name: "Tabs",
  gap: "$1",
  orientation: "horizontal",
  flexDirection: "column",

  variants: {
    orientation: {
      horizontal: {
        flexDirection: "column",
      },
      vertical: {
        flexDirection: "row",
      },
    },
  } as const,

  defaultVariants: {
    orientation: "horizontal",
  },
});
TabsComponent.displayName = "TabsComponent";

const TabsListFrame = styled(TamaguiTabs.List, {
  name: "TabsList",
  alignSelf: "flex-start",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "row",

  variants: {
    variant: {
      default: {
        backgroundColor: "$muted",
        borderRadius: "$md",
        padding: "$0.75",
        minHeight: "$9",
        height: "$9",
      },
      line: {
        backgroundColor: "transparent",
        borderRadius: "$none",
        borderBottomWidth: "$px",
        borderBottomColor: "$border",
        gap: "$1",
        padding: "$0",
        minHeight: "$9",
        height: "$9",
      },
    },
  } as const,

  defaultVariants: {
    variant: "default",
  },
});
TabsListFrame.displayName = "TabsListFrame";

/**
 * Horizontal or vertical list container wrapping tab triggers.
 * Supports pill (default) and line underline visual variants.
 */
export const TabsList = ({ variant = "default", children, ...props }: TabsListProps) => {
  return (
    <TabsListContext.Provider value={{ variant }}>
      <TabsListFrame variant={variant} {...props}>
        {children}
      </TabsListFrame>
    </TabsListContext.Provider>
  );
};

TabsList.displayName = "TabsList";
export type TabsListProps = React.ComponentPropsWithoutRef<typeof TabsListFrame> & {
  variant?: TabsListVariant;
};

const TabsTriggerFrame = styled(TamaguiTabs.Trigger, {
  name: "TabsTrigger",
  position: "relative",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  paddingHorizontal: "$2.5",
  paddingVertical: "$1",
  userSelect: "none",
  cursor: "pointer",
  height: "100%",
  gap: "$1.5",
  hoverStyle: {
    opacity: 0.9,
  },
  focusVisibleStyle: {
    outlineColor: "$ring",
    outlineWidth: "$0.5",
    outlineStyle: "solid",
  },

  variants: {
    active: {
      true: {
        backgroundColor: "$background",
        borderRadius: "$sm",
        elevation: "$1",
      },
      false: {
        backgroundColor: "transparent",
        borderRadius: "$sm",
        elevation: "$0",
      },
    },
    lineActive: {
      true: {
        backgroundColor: "transparent",
        borderRadius: "$none",
        borderBottomWidth: "$0.5",
        borderBottomColor: "$foreground",
        elevation: "$0",
      },
      false: {
        backgroundColor: "transparent",
        borderRadius: "$none",
        borderBottomWidth: "$0.5",
        borderBottomColor: "transparent",
        elevation: "$0",
      },
    },
    disabled: {
      true: {
        opacity: 0.5,
        pointerEvents: "none",
      },
    },
  } as const,
});
TabsTriggerFrame.displayName = "TabsTriggerFrame";

/**
 * Interactive button to activate a tab panel, with automatic text node wrapping.
 * Adapts visual appearance seamlessly for pill and line TabsList variants.
 */
export const TabsTrigger = ({ value, children, ...props }: TabsTriggerProps) => {
  const context = useTabsContext();
  const { variant } = React.useContext(TabsListContext);
  const isSelected = context.value === value;

  const renderedChildren = React.Children.map(children, (child) => {
    if (typeof child === "string" || typeof child === "number") {
      return (
        <SizableText
          color={isSelected ? "$foreground" : "$mutedForeground"}
          fontSize="$sm"
          fontWeight="500"
          lineHeight="$sm"
          userSelect="none"
        >
          {child}
        </SizableText>
      );
    }
    return child;
  });

  return (
    <TabsTriggerFrame
      value={value}
      active={variant === "default" ? isSelected : undefined}
      lineActive={variant === "line" ? isSelected : undefined}
      {...props}
    >
      {renderedChildren}
    </TabsTriggerFrame>
  );
};

TabsTrigger.displayName = "TabsTrigger";
export type TabsTriggerProps = React.ComponentPropsWithoutRef<typeof TabsTriggerFrame>;

/**
 * Panel content container displayed when its corresponding tab trigger is active.
 * Extends the native Tamagui Tabs.Content frame with responsive padding.
 */
export const TabsContent = styled(TamaguiTabs.Content, {
  name: "TabsContent",
  flex: 1,
  paddingVertical: "$2",
  outlineStyle: "none",
});

TabsContent.displayName = "TabsContent";
export type TabsContentProps = GetProps<typeof TabsContent>;

/**
 * Root container for tabbed interfaces coordinating active tab state and focus.
 * Supports horizontal or vertical orientation with standardized gap spacing.
 */
export const Tabs = withStaticProperties(TabsComponent, {
  List: TabsList,
  Trigger: TabsTrigger,
  Tab: TabsTrigger,
  Content: TabsContent,
});

Tabs.displayName = "Tabs";
export type TabsProps = GetProps<typeof TabsComponent>;
