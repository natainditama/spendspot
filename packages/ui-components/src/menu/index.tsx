import React, { createContext, forwardRef, useContext, useState } from "react";
import { Modal, Pressable } from "react-native";
import { Paragraph, Separator, styled, View, XStack, YStack } from "tamagui";

interface MenuContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const MenuContext = createContext<MenuContextValue>({
  isOpen: false,
  setIsOpen: () => {},
});

export interface MenuProps {
  trigger?: (props: { onPress: () => void }) => React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: string;
  offset?: number;
  children?: React.ReactNode;
  className?: string;
}

/** Dropdown context menu presenting a floating list of action items. */
export const Menu = forwardRef<any, MenuProps>(function Menu(
  { trigger, isOpen: controlledOpen, onOpenChange, children, ...props },
  ref
) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isOpen = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;

  const setIsOpen = (next: boolean) => {
    setUncontrolledOpen(next);
    onOpenChange?.(next);
  };

  const triggerNode = trigger ? trigger({ onPress: () => setIsOpen(!isOpen) }) : null;

  return (
    <MenuContext.Provider value={{ isOpen, setIsOpen }}>
      <View ref={ref} {...props}>
        {triggerNode}
        {isOpen && (
          <Modal visible={isOpen} transparent animationType="fade" onRequestClose={() => setIsOpen(false)}>
            <Pressable
              style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
              onPress={() => setIsOpen(false)}
            />
            <View flex={1} alignItems="center" justifyContent="center">
              <YStack
                backgroundColor="$background"
                borderRadius={8}
                borderWidth={1}
                borderColor="$borderColor"
                padding={4}
                minWidth={200}
                shadowColor="$shadowColor"
                shadowRadius={12}
                shadowOffset={{ width: 0, height: 4 }}
                shadowOpacity={0.15}
                gap={2}
              >
                {children}
              </YStack>
            </View>
          </Modal>
        )}
      </View>
    </MenuContext.Provider>
  );
});

export interface MenuItemProps extends React.ComponentPropsWithoutRef<typeof XStack> {
  textValue?: string;
  className?: string;
}

/** Clickable row entry within a dropdown menu. */
export const MenuItem = forwardRef<React.ElementRef<typeof XStack>, MenuItemProps>(function MenuItem(
  { onPress, children, ...props },
  ref
) {
  const { setIsOpen } = useContext(MenuContext);

  const handlePress = (e: any) => {
    onPress?.(e);
    setIsOpen(false);
  };

  return (
    <XStack
      ref={ref}
      paddingVertical={8}
      paddingHorizontal={12}
      borderRadius={6}
      cursor="pointer"
      pressStyle={{ backgroundColor: "$backgroundHover" }}
      hoverStyle={{ backgroundColor: "$backgroundHover" }}
      alignItems="center"
      onPress={handlePress}
      {...props}
    >
      {children}
    </XStack>
  );
});

export interface MenuItemLabelProps extends React.ComponentPropsWithoutRef<typeof Paragraph> {
  className?: string;
  isTruncated?: boolean;
  bold?: boolean;
}

/** Text node displaying label for an individual MenuItem. */
export const MenuItemLabel = forwardRef<React.ElementRef<typeof Paragraph>, MenuItemLabelProps>(function MenuItemLabel(
  { children, bold, ...props },
  ref
) {
  return (
    <Paragraph ref={ref} fontSize={14} fontWeight={bold ? "600" : "400"} color="$color" userSelect="none" {...props}>
      {children}
    </Paragraph>
  );
});

export const MenuSeparator = styled(Separator, {
  name: "MenuSeparator",
  borderColor: "$borderColor",
  marginVertical: 4,
});

Menu.displayName = "Menu";
MenuItem.displayName = "MenuItem";
MenuItemLabel.displayName = "MenuItemLabel";
MenuSeparator.displayName = "MenuSeparator";
