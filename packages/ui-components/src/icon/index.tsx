import React, { forwardRef } from "react";
import { styled, View } from "tamagui";
import { Bell, Calendar, Check, ChevronRight, Heart, Info, Plus, X } from "@tamagui/lucide-icons";

const StyledIconView = styled(View, {
  name: "Icon",
  alignItems: "center",
  justifyContent: "center",
});

export interface IconProps extends Omit<React.ComponentPropsWithoutRef<typeof StyledIconView>, "as"> {
  as?: React.ComponentType<any>;
  size?: number | string;
  color?: string;
  className?: string;
}

const ICON_SIZE_MAP: Record<string, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  "2xl": 40,
};

export const Icon = forwardRef<React.ElementRef<typeof StyledIconView>, IconProps>(function Icon(
  { as: Component, size = 20, color, children, ...props },
  ref
) {
  const numericSize = typeof size === "number" ? size : (ICON_SIZE_MAP[size] ?? 20);

  if (Component) {
    return (
      <StyledIconView ref={ref} width={numericSize} height={numericSize} {...props}>
        <Component size={numericSize} width={numericSize} height={numericSize} color={color} />
      </StyledIconView>
    );
  }

  return (
    <StyledIconView ref={ref} width={numericSize} height={numericSize} {...props}>
      {children}
    </StyledIconView>
  );
});

export const AddIcon = Plus;
export const CheckIcon = Check;
export const CloseIcon = X;
export const InfoIcon = Info;
export const BellIcon = Bell;
export const CalendarDaysIcon = Calendar;
export const ChevronRightIcon = ChevronRight;
export const FavouriteIcon = Heart;

export default Icon;
