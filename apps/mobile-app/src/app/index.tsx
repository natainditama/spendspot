import React, { useState } from "react";
import { ScrollView } from "react-native";

// Layout & Primitives
import { Box } from "@spendspot/ui-components/box";
import { Center } from "@spendspot/ui-components/center";
import { Grid, GridItem } from "@spendspot/ui-components/grid";
import { HStack } from "@spendspot/ui-components/hstack";
import { VStack } from "@spendspot/ui-components/vstack";
import { Divider } from "@spendspot/ui-components/divider";
import { Portal } from "@spendspot/ui-components/portal";
import { Pressable } from "@spendspot/ui-components/pressable";

// Typography & Content
import { Heading } from "@spendspot/ui-components/heading";
import { Text } from "@spendspot/ui-components/text";
import {
  Icon,
  AddIcon,
  CheckIcon,
  CloseIcon,
  InfoIcon,
  BellIcon,
  CalendarDaysIcon,
  ChevronRightIcon,
  FavouriteIcon,
} from "@spendspot/ui-components/icon";
import { Link, LinkText } from "@spendspot/ui-components/link";

// Surfaces & Data Display
import { Card } from "@spendspot/ui-components/card";
import { Badge, BadgeText, BadgeIcon } from "@spendspot/ui-components/badge";
import { Avatar, AvatarFallbackText, AvatarBadge, AvatarGroup } from "@spendspot/ui-components/avatar";

// Form Controls & Inputs
import { Button, ButtonText, ButtonIcon, ButtonSpinner, ButtonGroup } from "@spendspot/ui-components/button";
import { Input, InputField, InputIcon, InputSlot } from "@spendspot/ui-components/input";
import { Textarea, TextareaInput } from "@spendspot/ui-components/textarea";
import { Switch } from "@spendspot/ui-components/switch";
import {
  Checkbox,
  CheckboxIndicator,
  CheckboxIcon,
  CheckboxLabel,
  CheckboxGroup,
} from "@spendspot/ui-components/checkbox";
import { Radio, RadioGroup, RadioIndicator, RadioIcon, RadioLabel } from "@spendspot/ui-components/radio";
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
} from "@spendspot/ui-components/select";
import { DateTimePicker } from "@spendspot/ui-components/date-time-picker";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlHelper,
  FormControlHelperText,
  FormControlError,
  FormControlErrorText,
  FormControlErrorIcon,
} from "@spendspot/ui-components/form-control";

// Feedback & Status
import { Alert, AlertIcon, AlertText } from "@spendspot/ui-components/alert";
import { Toast, ToastTitle, ToastDescription, useToast } from "@spendspot/ui-components/toast";
import { Spinner } from "@spendspot/ui-components/spinner";
import { Skeleton, SkeletonText } from "@spendspot/ui-components/skeleton";

// Overlays & Navigation
import { Tabs, TabsList, TabsTrigger, TabsTriggerText } from "@spendspot/ui-components/tabs";
import { Menu, MenuItem, MenuItemLabel } from "@spendspot/ui-components/menu";
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@spendspot/ui-components/modal";
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
} from "@spendspot/ui-components/alert-dialog";
import {
  BottomSheet,
  BottomSheetTrigger,
  BottomSheetPortal,
  BottomSheetContent,
  BottomSheetDragIndicator,
  BottomSheetItem,
  BottomSheetItemText,
} from "@spendspot/ui-components/bottomsheet";

// Providers
import { Provider } from "@spendspot/ui-components/provider";

/**
 * Comprehensive Showcase demonstrating all 41 SpendSpot UI Components.
 * Systematically exhibits every size, variant, color action, and state.
 */
export default function ComponentShowcase() {
  const [activeCategory, setActiveCategory] = useState<string>("layout");

  // Form interactive states
  const [switchState, setSwitchState] = useState(true);
  const [checkboxValues, setCheckboxValues] = useState<string[]>(["item1"]);
  const [radioValue, setRadioValue] = useState("option1");
  const [selectValue, setSelectValue] = useState("idr");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isSkeletonLoaded, setIsSkeletonLoaded] = useState(false);

  // Overlay interactive states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSize, setModalSize] = useState<"xs" | "sm" | "md" | "lg" | "full">("md");
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [alertDialogSize, setAlertDialogSize] = useState<"xs" | "sm" | "md" | "lg" | "full">("md");
  const [isActionsheetOpen, setIsActionsheetOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerAnchor, setDrawerAnchor] = useState<"left" | "right" | "top" | "bottom">("left");
  const [drawerSize, setDrawerSize] = useState<"sm" | "md" | "lg" | "full">("md");

  // Toast hook
  const toast = useToast();

  const triggerToast = (action: "error" | "warning" | "success" | "info" | "muted", variant: "solid" | "outline") => {
    toast.show({
      placement: "top",
      render: ({ id }) => (
        <Toast nativeID={`toast-${id}`} action={action} variant={variant}>
          <ToastTitle>Toast Notification ({action})</ToastTitle>
          <ToastDescription>Variant: {variant}. Interactive feedback notification rendered cleanly.</ToastDescription>
        </Toast>
      ),
    });
  };

  const categories = [
    { id: "layout", label: "1. Layout" },
    { id: "typography", label: "2. Typography" },
    { id: "surfaces", label: "3. Surfaces" },
    { id: "inputs", label: "4. Inputs" },
    { id: "feedback", label: "5. Feedback" },
    { id: "overlays", label: "6. Overlays" },
  ];

  return (
    <ScrollView className="flex-1 bg-background" contentContainerClassName="p-4 pb-20 gap-6">
      {/* Header Banner */}
      <VStack space="sm" className="bg-muted/40 p-4 rounded-xl border border-border">
        <HStack className="items-center justify-between gap-2">
          <Badge variant="default">
            <BadgeIcon as={CheckIcon} />
            <BadgeText>Design System v1.0</BadgeText>
          </Badge>
          <Text size="xs" className="text-muted-foreground">
            41 Components Active
          </Text>
        </HStack>
        <Heading size="xl">SpendSpot UI Showcase</Heading>
        <Text size="sm" className="text-muted-foreground">
          Exhaustive showcase exhibiting all 41 components with every size and variant.
        </Text>
      </VStack>

      {/* Category Navigation Tabs */}
      <Tabs value={activeCategory} onValueChange={setActiveCategory} variant="filled">
        <TabsList>
          {categories.map((cat) => (
            <TabsTrigger key={cat.id} value={cat.id}>
              <TabsTriggerText>{cat.label}</TabsTriggerText>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* ========================================================================= */}
      {/* CATEGORY 1: LAYOUT & PRIMITIVES                                          */}
      {/* ========================================================================= */}
      {activeCategory === "layout" && (
        <VStack space="lg">
          <Heading size="lg">1. Layout & Primitives</Heading>

          {/* Box & Center */}
          <Card size="default">
            <VStack space="sm">
              <Heading size="sm">Box & Center</Heading>
              <Text size="xs" className="text-muted-foreground">
                Universal containers and centering wrappers
              </Text>
              <HStack space="md">
                <Box className="bg-primary/10 border border-primary p-4 rounded-lg flex-1">
                  <Text size="sm" bold>
                    Box Component
                  </Text>
                  <Text size="xs">Padded container with rounded corners</Text>
                </Box>
                <Center className="bg-secondary/20 border border-secondary p-4 rounded-lg flex-1 h-20">
                  <Text size="sm" bold>
                    Center Component
                  </Text>
                  <Text size="xs">Perfect center alignment</Text>
                </Center>
              </HStack>
            </VStack>
          </Card>

          {/* Grid & GridItem */}
          <Card size="default">
            <VStack space="sm">
              <Heading size="sm">Grid & GridItem</Heading>
              <Text size="xs" className="text-muted-foreground">
                Multi-column responsive grid layout
              </Text>
              <Grid className="gap-2" _extra={{ className: "grid-cols-3" }}>
                <GridItem _extra={{ className: "col-span-1" }}>
                  <Box className="bg-muted p-3 rounded items-center">
                    <Text size="xs">Col 1</Text>
                  </Box>
                </GridItem>
                <GridItem _extra={{ className: "col-span-1" }}>
                  <Box className="bg-muted p-3 rounded items-center">
                    <Text size="xs">Col 2</Text>
                  </Box>
                </GridItem>
                <GridItem _extra={{ className: "col-span-1" }}>
                  <Box className="bg-muted p-3 rounded items-center">
                    <Text size="xs">Col 3</Text>
                  </Box>
                </GridItem>
              </Grid>
            </VStack>
          </Card>

          {/* HStack Spacing Scales & Reversed */}
          <Card size="default">
            <VStack space="sm">
              <Heading size="sm">HStack (Horizontal Stack)</Heading>
              <Text size="xs" className="text-muted-foreground">
                All spaces: xs, sm, md, lg, xl, 2xl, 3xl, 4xl
              </Text>
              {(["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"] as const).map((s) => (
                <HStack key={s} space={s} className="items-center bg-muted/20 p-1.5 rounded">
                  <Badge variant="outline">
                    <BadgeText>{`space="${s}"`}</BadgeText>
                  </Badge>
                  <Box className="h-6 w-8 bg-primary/40 rounded" />
                  <Box className="h-6 w-8 bg-primary/70 rounded" />
                  <Box className="h-6 w-8 bg-primary rounded" />
                </HStack>
              ))}
              <Text size="xs" bold className="mt-2">
                Reversed: true
              </Text>
              <HStack space="md" reversed className="bg-muted/20 p-2 rounded items-center">
                <Badge variant="default">
                  <BadgeText>First in code (renders last)</BadgeText>
                </Badge>
                <Badge variant="secondary">
                  <BadgeText>Middle</BadgeText>
                </Badge>
                <Badge variant="default">
                  <BadgeText>Last in code (renders first)</BadgeText>
                </Badge>
              </HStack>
            </VStack>
          </Card>

          {/* VStack Spacing Scales & Reversed */}
          <Card size="default">
            <VStack space="sm">
              <Heading size="sm">VStack (Vertical Stack)</Heading>
              <Text size="xs" className="text-muted-foreground">
                All spaces: xs, sm, md, lg, xl, 2xl, 3xl, 4xl
              </Text>
              <HStack space="md" className="flex-wrap">
                {(["xs", "sm", "md", "lg"] as const).map((s) => (
                  <VStack key={s} space={s} className="bg-muted/20 p-2 rounded flex-1">
                    <Badge variant="default">
                      <BadgeText>{`space="${s}"`}</BadgeText>
                    </Badge>
                    <Box className="h-4 bg-accent/40 rounded" />
                    <Box className="h-4 bg-accent/70 rounded" />
                  </VStack>
                ))}
              </HStack>
              <Text size="xs" bold className="mt-2">
                Reversed: true
              </Text>
              <VStack space="xs" reversed className="bg-muted/20 p-2 rounded">
                <Text size="xs">1. Top code element (renders at bottom)</Text>
                <Text size="xs">2. Bottom code element (renders at top)</Text>
              </VStack>
            </VStack>
          </Card>

          {/* Divider */}
          <Card size="default">
            <VStack space="sm">
              <Heading size="sm">Divider</Heading>
              <Text size="xs" className="text-muted-foreground">
                Horizontal and vertical separation lines
              </Text>
              <Text size="xs">Content before horizontal divider</Text>
              <Divider orientation="horizontal" />
              <Text size="xs">Content after horizontal divider</Text>
              <HStack space="md" className="items-center h-8">
                <Text size="xs">Left item</Text>
                <Divider orientation="vertical" className="h-6" />
                <Text size="xs">Right item</Text>
              </HStack>
            </VStack>
          </Card>

          {/* Portal & Pressable */}
          <Card size="default">
            <VStack space="sm">
              <Heading size="sm">Portal & Pressable</Heading>
              <Text size="xs" className="text-muted-foreground">
                Detached overlay portals and interactive press targets
              </Text>
              <Pressable
                className="bg-primary/10 active:bg-primary/20 p-3 rounded-lg border border-primary/30"
                onPress={() => console.log("Pressable pressed")}
              >
                <Text size="sm" bold>
                  Interactive Pressable Area
                </Text>
                <Text size="xs" className="text-muted-foreground">
                  Press to view feedback style
                </Text>
              </Pressable>
              <Portal>
                {/* Portal can render anywhere in the root tree */}
                <Box />
              </Portal>
            </VStack>
          </Card>
        </VStack>
      )}

      {/* ========================================================================= */}
      {/* CATEGORY 2: TYPOGRAPHY & CONTENT                                         */}
      {/* ========================================================================= */}
      {activeCategory === "typography" && (
        <VStack space="lg">
          <Heading size="lg">2. Typography & Content</Heading>

          {/* Heading Sizes */}
          <Card size="default">
            <VStack space="xs">
              <Heading size="sm">Heading (All 9 Sizes)</Heading>
              <Text size="xs" className="text-muted-foreground mb-2">
                5xl, 4xl, 3xl, 2xl, xl, lg, md, sm, xs
              </Text>
              <Heading size="5xl">Heading 5xl</Heading>
              <Heading size="4xl">Heading 4xl</Heading>
              <Heading size="3xl">Heading 3xl</Heading>
              <Heading size="2xl">Heading 2xl</Heading>
              <Heading size="xl">Heading xl</Heading>
              <Heading size="lg">Heading lg</Heading>
              <Heading size="md">Heading md</Heading>
              <Heading size="sm">Heading sm</Heading>
              <Heading size="xs">Heading xs</Heading>
            </VStack>
          </Card>

          {/* Text Sizes & Formatting */}
          <Card size="default">
            <VStack space="xs">
              <Heading size="sm">Text (All 11 Sizes)</Heading>
              <Text size="xs" className="text-muted-foreground mb-2">
                2xs, xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl
              </Text>
              <Text size="2xs">Text 2xs - Micro label</Text>
              <Text size="xs">Text xs - Helper notation</Text>
              <Text size="sm">Text sm - Secondary copy</Text>
              <Text size="md">Text md - Standard paragraph body</Text>
              <Text size="lg">Text lg - Subheading text</Text>
              <Text size="xl">Text xl - Large feature text</Text>
              <Text size="2xl">Text 2xl - Display text</Text>
              <Text size="3xl">Text 3xl - Large display text</Text>
              <Text size="4xl">Text 4xl - Hero caption</Text>
              <Text size="5xl">Text 5xl - Big metric text</Text>
              <Text size="6xl">Text 6xl - Banner headline</Text>
              <Divider orientation="horizontal" className="my-2" />
              <Heading size="xs">Text Format Props</Heading>
              <Text size="sm" bold>
                Bold Text
              </Text>
              <Text size="sm" italic>
                Italic Text
              </Text>
              <Text size="sm" underline>
                Underline Text
              </Text>
              <Text size="sm" strikeThrough>
                StrikeThrough Text
              </Text>
              <Text size="sm" highlight>
                Highlighted Text Background
              </Text>
              <Text size="sm" sub>
                Subscript Style Text
              </Text>
              <Text size="sm" isTruncated className="w-48">
                Truncated single-line text that overflows cleanly with trailing ellipsis.
              </Text>
            </VStack>
          </Card>

          {/* Icon Component & Sizes */}
          <Card size="default">
            <VStack space="sm">
              <Heading size="sm">Icon (All 6 Sizes & System Icons)</Heading>
              <Text size="xs" className="text-muted-foreground">
                Sizes: 2xs, xs, sm, md, lg, xl
              </Text>
              <HStack space="lg" className="items-center">
                <VStack space="xs" className="items-center">
                  <Icon as={AddIcon} size="2xs" />
                  <Text size="2xs">2xs</Text>
                </VStack>
                <VStack space="xs" className="items-center">
                  <Icon as={CheckIcon} size="xs" />
                  <Text size="2xs">xs</Text>
                </VStack>
                <VStack space="xs" className="items-center">
                  <Icon as={CloseIcon} size="sm" />
                  <Text size="2xs">sm</Text>
                </VStack>
                <VStack space="xs" className="items-center">
                  <Icon as={InfoIcon} size="md" />
                  <Text size="2xs">md</Text>
                </VStack>
                <VStack space="xs" className="items-center">
                  <Icon as={BellIcon} size="lg" />
                  <Text size="2xs">lg</Text>
                </VStack>
                <VStack space="xs" className="items-center">
                  <Icon as={FavouriteIcon} size="xl" />
                  <Text size="2xs">xl</Text>
                </VStack>
              </HStack>
              <HStack space="md" className="items-center mt-2">
                <Icon as={CalendarDaysIcon} size="md" />
                <Icon as={ChevronRightIcon} size="md" />
              </HStack>
            </VStack>
          </Card>

          {/* Link Component */}
          <Card size="default">
            <VStack space="xs">
              <Heading size="sm">Link & LinkText</Heading>
              <Text size="xs" className="text-muted-foreground">
                Accessible navigation hyperlink
              </Text>
              <Link href="https://spendspot.app">
                <LinkText size="md">Visit SpendSpot Documentation</LinkText>
              </Link>
            </VStack>
          </Card>
        </VStack>
      )}

      {/* ========================================================================= */}
      {/* CATEGORY 3: SURFACES & DATA DISPLAY                                      */}
      {/* ========================================================================= */}
      {activeCategory === "surfaces" && (
        <VStack space="lg">
          <Heading size="lg">3. Surfaces & Data Display</Heading>

          {/* Card Component (Sizes: default, sm) */}
          <Card size="default">
            <VStack space="sm">
              <Heading size="sm">Card (Sizes: default, sm)</Heading>
              <Text size="xs" className="text-muted-foreground">
                Standardized elevated card surface container
              </Text>
              <Card size="sm">
                <Text size="sm" bold>
                  Card: size=&quot;sm&quot;
                </Text>
                <Text size="xs">Compact padding and gap</Text>
              </Card>
              <Card size="default">
                <Text size="sm" bold>
                  Card: size=&quot;default&quot;
                </Text>
                <Text size="xs">Standard padding and comfortable layout</Text>
              </Card>
            </VStack>
          </Card>

          {/* Badge Component (All Variants & Sizes) */}
          <Card size="default">
            <VStack space="sm">
              <Heading size="sm">Badge (All Variants & Dimensions)</Heading>
              <Text size="xs" className="text-muted-foreground">
                Variants: default, secondary, destructive, outline
              </Text>
              <Text size="xs" bold>
                Standard Badge Variants:
              </Text>
              <HStack space="xs" className="flex-wrap">
                <Badge variant="default">
                  <BadgeIcon as={CheckIcon} />
                  <BadgeText>default</BadgeText>
                </Badge>
                <Badge variant="secondary">
                  <BadgeIcon as={InfoIcon} />
                  <BadgeText>secondary</BadgeText>
                </Badge>
                <Badge variant="destructive">
                  <BadgeIcon as={CloseIcon} />
                  <BadgeText>destructive</BadgeText>
                </Badge>
                <Badge variant="outline">
                  <BadgeIcon as={BellIcon} />
                  <BadgeText>outline</BadgeText>
                </Badge>
              </HStack>
              <Text size="xs" bold className="mt-2">
                Badge Custom Sizing & Pill Scales:
              </Text>
              <HStack space="xs" className="flex-wrap items-center">
                <Badge variant="default" className="px-1.5 py-0 rounded-xs">
                  <BadgeText className="text-[10px]">xs badge</BadgeText>
                </Badge>
                <Badge variant="secondary" className="px-3 py-1 rounded-full">
                  <BadgeText>pill badge</BadgeText>
                </Badge>
                <Badge variant="destructive" className="px-4 py-1.5 rounded-md">
                  <BadgeIcon as={InfoIcon} size={14} />
                  <BadgeText className="text-sm">lg badge</BadgeText>
                </Badge>
              </HStack>
            </VStack>
          </Card>

          {/* Avatar Component (Sizing Scales & Group) */}
          <Card size="default">
            <VStack space="sm">
              <Heading size="sm">Avatar (Sizing Dimensions & Group)</Heading>
              <Text size="xs" className="text-muted-foreground">
                Scales: h-8 w-8, h-10 w-10, h-12 w-12, h-14 w-14, h-16 w-16
              </Text>
              <HStack space="md" className="items-end">
                <Avatar className="h-8 w-8">
                  <AvatarFallbackText>XS</AvatarFallbackText>
                </Avatar>
                <Avatar className="h-10 w-10">
                  <AvatarFallbackText>SM</AvatarFallbackText>
                </Avatar>
                <Avatar className="h-12 w-12">
                  <AvatarFallbackText>MD</AvatarFallbackText>
                  <AvatarBadge />
                </Avatar>
                <Avatar className="h-14 w-14">
                  <AvatarFallbackText>LG</AvatarFallbackText>
                  <AvatarBadge />
                </Avatar>
                <Avatar className="h-16 w-16">
                  <AvatarFallbackText>XL</AvatarFallbackText>
                </Avatar>
              </HStack>
              <Text size="xs" bold className="mt-2">
                AvatarGroup:
              </Text>
              <AvatarGroup>
                <Avatar className="h-12 w-12">
                  <AvatarFallbackText>JD</AvatarFallbackText>
                </Avatar>
                <Avatar className="h-12 w-12">
                  <AvatarFallbackText>AS</AvatarFallbackText>
                </Avatar>
                <Avatar className="h-12 w-12">
                  <AvatarFallbackText>+3</AvatarFallbackText>
                </Avatar>
              </AvatarGroup>
            </VStack>
          </Card>
        </VStack>
      )}

      {/* ========================================================================= */}
      {/* CATEGORY 4: FORM CONTROLS & INPUTS                                       */}
      {/* ========================================================================= */}
      {activeCategory === "inputs" && (
        <VStack space="lg">
          <Heading size="lg">4. Form Controls & Inputs</Heading>

          {/* Button (All Variants & Sizes) */}
          <Card size="default">
            <VStack space="sm">
              <Heading size="sm">Button (All Variants & Sizes)</Heading>
              <Text size="xs" className="text-muted-foreground">
                Variants: default, destructive, outline, secondary, ghost, link | Sizes: sm, default, lg, icon
              </Text>

              <Text size="xs" bold>
                Sizes (sm, default, lg, icon):
              </Text>
              <HStack space="xs" className="items-center flex-wrap">
                <Button size="sm" variant="default">
                  <ButtonText>sm</ButtonText>
                </Button>
                <Button size="default" variant="default">
                  <ButtonText>default</ButtonText>
                </Button>
                <Button size="lg" variant="default">
                  <ButtonText>lg</ButtonText>
                </Button>
                <Button size="icon" variant="outline">
                  <ButtonIcon as={AddIcon} />
                </Button>
              </HStack>

              <Text size="xs" bold className="mt-2">
                Variants:
              </Text>
              <HStack space="xs" className="flex-wrap">
                <Button variant="default">
                  <ButtonText>Default</ButtonText>
                </Button>
                <Button variant="destructive">
                  <ButtonText>Destructive</ButtonText>
                </Button>
                <Button variant="outline">
                  <ButtonText>Outline</ButtonText>
                </Button>
                <Button variant="secondary">
                  <ButtonText>Secondary</ButtonText>
                </Button>
                <Button variant="ghost">
                  <ButtonText>Ghost</ButtonText>
                </Button>
                <Button variant="link">
                  <ButtonText>Link</ButtonText>
                </Button>
              </HStack>

              <Text size="xs" bold className="mt-2">
                With Icons & Spinner:
              </Text>
              <HStack space="xs" className="flex-wrap">
                <Button variant="default" size="sm">
                  <ButtonIcon as={CheckIcon} />
                  <ButtonText>Check</ButtonText>
                </Button>
                <Button variant="outline" size="sm" isDisabled>
                  <ButtonSpinner />
                  <ButtonText>Loading</ButtonText>
                </Button>
              </HStack>

              <Text size="xs" bold className="mt-2">
                ButtonGroup:
              </Text>
              <ButtonGroup space="xs">
                <Button variant="outline" size="sm">
                  <ButtonText>Cancel</ButtonText>
                </Button>
                <Button variant="default" size="sm">
                  <ButtonText>Save Expense</ButtonText>
                </Button>
              </ButtonGroup>
            </VStack>
          </Card>

          {/* Input Component (All Variants & Sizes) */}
          <Card size="default">
            <VStack space="sm">
              <Heading size="sm">Input (Forms, Slots, States & Scales)</Heading>
              <Text size="xs" className="text-muted-foreground">
                Slots, Icons, Disabled, Invalid & Custom Dimensional Scales
              </Text>
              <Input>
                <InputField placeholder="Standard Default Input" />
              </Input>
              <Input>
                <InputSlot className="pl-3">
                  <InputIcon as={InfoIcon} />
                </InputSlot>
                <InputField placeholder="Input with Leading Slot Icon" />
              </Input>
              <Input isDisabled>
                <InputField placeholder="Disabled Input State" />
              </Input>
              <Input isInvalid>
                <InputField placeholder="Invalid Validation Error State" />
              </Input>
              <Input className="h-8">
                <InputField className="text-xs" placeholder="Compact Height Input (h-8)" />
              </Input>
              <Input className="h-12 rounded-full px-4">
                <InputField className="text-base" placeholder="Rounded Pill Large Input (h-12)" />
              </Input>
            </VStack>
          </Card>

          {/* Textarea Component */}
          <Card size="default">
            <VStack space="sm">
              <Heading size="sm">Textarea (All Sizes)</Heading>
              <Text size="xs" className="text-muted-foreground">
                Sizes: sm, md, lg, xl
              </Text>
              <Textarea size="sm">
                <TextareaInput placeholder="Textarea small (sm)" />
              </Textarea>
              <Textarea size="md">
                <TextareaInput placeholder="Textarea standard (md) - Enter notes or description" />
              </Textarea>
            </VStack>
          </Card>

          {/* Switch Component */}
          <Card size="default">
            <VStack space="sm">
              <Heading size="sm">Switch (All Sizes: sm, md, lg)</Heading>
              <HStack space="lg" className="items-center">
                <HStack space="xs" className="items-center">
                  <Switch size="sm" value={switchState} onValueChange={setSwitchState} />
                  <Text size="xs">sm</Text>
                </HStack>
                <HStack space="xs" className="items-center">
                  <Switch size="md" value={switchState} onValueChange={setSwitchState} />
                  <Text size="xs">md</Text>
                </HStack>
                <HStack space="xs" className="items-center">
                  <Switch size="lg" value={switchState} onValueChange={setSwitchState} />
                  <Text size="xs">lg</Text>
                </HStack>
              </HStack>
            </VStack>
          </Card>

          {/* Checkbox Component */}
          <Card size="default">
            <VStack space="sm">
              <Heading size="sm">Checkbox (Interactive & States)</Heading>
              <CheckboxGroup value={checkboxValues} onChange={setCheckboxValues}>
                <VStack space="xs">
                  <Checkbox value="item1">
                    <CheckboxIndicator>
                      <CheckboxIcon as={CheckIcon} />
                    </CheckboxIndicator>
                    <CheckboxLabel>Groceries & Supermarkets</CheckboxLabel>
                  </Checkbox>
                  <Checkbox value="item2">
                    <CheckboxIndicator className="h-5 w-5">
                      <CheckboxIcon as={CheckIcon} size={16} />
                    </CheckboxIndicator>
                    <CheckboxLabel className="text-base">Utilities & Bills (Custom Size)</CheckboxLabel>
                  </Checkbox>
                  <Checkbox value="item3" isDisabled>
                    <CheckboxIndicator>
                      <CheckboxIcon as={CheckIcon} />
                    </CheckboxIndicator>
                    <CheckboxLabel>Dining & Nightlife (Disabled)</CheckboxLabel>
                  </Checkbox>
                  <Checkbox value="item4" isInvalid>
                    <CheckboxIndicator>
                      <CheckboxIcon as={CheckIcon} />
                    </CheckboxIndicator>
                    <CheckboxLabel>Emergency Fund (Invalid State)</CheckboxLabel>
                  </Checkbox>
                </VStack>
              </CheckboxGroup>
            </VStack>
          </Card>

          {/* Radio Component */}
          <Card size="default">
            <VStack space="sm">
              <Heading size="sm">Radio (All Sizes: sm, md, lg)</Heading>
              <RadioGroup value={radioValue} onChange={setRadioValue}>
                <VStack space="xs">
                  <Radio size="sm" value="option1">
                    <RadioIndicator>
                      <RadioIcon as={CheckIcon} />
                    </RadioIndicator>
                    <RadioLabel>Radio Small (sm)</RadioLabel>
                  </Radio>
                  <Radio size="md" value="option2">
                    <RadioIndicator>
                      <RadioIcon as={CheckIcon} />
                    </RadioIndicator>
                    <RadioLabel>Radio Medium (md)</RadioLabel>
                  </Radio>
                  <Radio size="lg" value="option3">
                    <RadioIndicator>
                      <RadioIcon as={CheckIcon} />
                    </RadioIndicator>
                    <RadioLabel>Radio Large (lg)</RadioLabel>
                  </Radio>
                </VStack>
              </RadioGroup>
            </VStack>
          </Card>

          {/* Select Component */}
          <Card size="default">
            <VStack space="sm">
              <Heading size="sm">Select (All Variants & Sizes via SelectTrigger)</Heading>
              <Text size="xs" className="text-muted-foreground">
                Variants: outline, underlined, rounded | Sizes: sm, md, lg
              </Text>
              <Select selectedValue={selectValue} onValueChange={setSelectValue}>
                <SelectTrigger size="md" variant="outline">
                  <SelectInput placeholder="Select Currency (outline md)" />
                  <SelectIcon as={ChevronRightIcon} />
                </SelectTrigger>
                <SelectPortal>
                  <SelectBackdrop />
                  <SelectContent>
                    <SelectDragIndicatorWrapper>
                      <SelectDragIndicator />
                    </SelectDragIndicatorWrapper>
                    <SelectItem label="IDR - Indonesian Rupiah" value="idr" />
                    <SelectItem label="USD - US Dollar" value="usd" />
                    <SelectItem label="EUR - Euro" value="eur" />
                  </SelectContent>
                </SelectPortal>
              </Select>

              <Select>
                <SelectTrigger size="sm" variant="rounded">
                  <SelectInput placeholder="Select Interval (rounded sm)" />
                  <SelectIcon as={ChevronRightIcon} />
                </SelectTrigger>
                <SelectPortal>
                  <SelectBackdrop />
                  <SelectContent>
                    <SelectDragIndicatorWrapper>
                      <SelectDragIndicator />
                    </SelectDragIndicatorWrapper>
                    <SelectItem label="Monthly" value="monthly" />
                    <SelectItem label="Yearly" value="yearly" />
                  </SelectContent>
                </SelectPortal>
              </Select>

              <Select>
                <SelectTrigger size="lg" variant="underlined">
                  <SelectInput placeholder="Select Account Type (underlined lg)" />
                  <SelectIcon as={ChevronRightIcon} />
                </SelectTrigger>
                <SelectPortal>
                  <SelectBackdrop />
                  <SelectContent>
                    <SelectDragIndicatorWrapper>
                      <SelectDragIndicator />
                    </SelectDragIndicatorWrapper>
                    <SelectItem label="Checking Account" value="checking" />
                    <SelectItem label="Savings Account" value="savings" />
                  </SelectContent>
                </SelectPortal>
              </Select>
            </VStack>
          </Card>

          {/* DateTimePicker Component */}
          <Card size="default">
            <VStack space="sm">
              <Heading size="sm">DateTimePicker (Modes: date, time, datetime)</Heading>
              <Text size="xs" className="text-muted-foreground">
                Interactive date and time selectors
              </Text>
              <DateTimePicker
                mode="date"
                value={selectedDate}
                onChange={setSelectedDate}
                placeholder="Pick transaction date"
              />
            </VStack>
          </Card>

          {/* FormControl Component */}
          <Card size="default">
            <VStack space="sm">
              <Heading size="sm">FormControl (Validation, Helper & Error States)</Heading>
              <FormControl isRequired isInvalid>
                <FormControlLabel>
                  <FormControlLabelText>Expense Amount</FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField placeholder="0.00" />
                </Input>
                <FormControlHelper>
                  <FormControlHelperText>Specify amount in base currency.</FormControlHelperText>
                </FormControlHelper>
                <FormControlError>
                  <FormControlErrorIcon as={InfoIcon} />
                  <FormControlErrorText>Amount is required and must be greater than 0.</FormControlErrorText>
                </FormControlError>
              </FormControl>
            </VStack>
          </Card>
        </VStack>
      )}

      {/* ========================================================================= */}
      {/* CATEGORY 5: FEEDBACK & STATUS                                            */}
      {/* ========================================================================= */}
      {activeCategory === "feedback" && (
        <VStack space="lg">
          <Heading size="lg">5. Feedback & Status</Heading>

          {/* Alert (All Variants) */}
          <Card size="default">
            <VStack space="sm">
              <Heading size="sm">Alert (All Variants)</Heading>
              <Text size="xs" className="text-muted-foreground">
                Variants: default, destructive
              </Text>

              <Alert variant="default">
                <AlertIcon as={CheckIcon} />
                <AlertText>Budget goal achieved successfully! SpendSpot saved you $120.</AlertText>
              </Alert>

              <Alert variant="destructive">
                <AlertIcon as={CloseIcon} />
                <AlertText>Transaction sync failed. Please check network connection.</AlertText>
              </Alert>

              <Alert variant="default" className="border-amber-500/50 bg-amber-500/10">
                <AlertIcon as={BellIcon} className="text-amber-500" />
                <AlertText className="text-amber-700 dark:text-amber-300">
                  Approaching 85% of monthly entertainment budget.
                </AlertText>
              </Alert>

              <Alert variant="default" className="border-blue-500/50 bg-blue-500/10">
                <AlertIcon as={InfoIcon} className="text-blue-500" />
                <AlertText className="text-blue-700 dark:text-blue-300">
                  SpendSpot AI updated your monthly categorization.
                </AlertText>
              </Alert>
            </VStack>
          </Card>

          {/* Toast Notification (Interactive Trigger) */}
          <Card size="default">
            <VStack space="sm">
              <Heading size="sm">Toast Notifications (Interactive Trigger)</Heading>
              <Text size="xs" className="text-muted-foreground">
                Trigger toasts using useToast hook across all actions
              </Text>
              <HStack space="xs" className="flex-wrap">
                <Button size="sm" variant="default" onPress={() => triggerToast("success", "solid")}>
                  <ButtonText>Success Toast</ButtonText>
                </Button>
                <Button size="sm" variant="destructive" onPress={() => triggerToast("error", "solid")}>
                  <ButtonText>Error Toast</ButtonText>
                </Button>
                <Button size="sm" variant="outline" onPress={() => triggerToast("info", "outline")}>
                  <ButtonText>Info Outline Toast</ButtonText>
                </Button>
              </HStack>
            </VStack>
          </Card>

          {/* Spinner Component */}
          <Card size="default">
            <VStack space="sm">
              <Heading size="sm">Spinner (Sizes: small, large)</Heading>
              <HStack space="xl" className="items-center">
                <VStack space="xs" className="items-center">
                  <Spinner size="small" />
                  <Text size="xs">small</Text>
                </VStack>
                <VStack space="xs" className="items-center">
                  <Spinner size="large" />
                  <Text size="xs">large</Text>
                </VStack>
              </HStack>
            </VStack>
          </Card>

          {/* Skeleton & SkeletonText */}
          <Card size="default">
            <VStack space="sm">
              <HStack className="items-center justify-between">
                <Heading size="sm">Skeleton & SkeletonText</Heading>
                <Button size="sm" variant="outline" onPress={() => setIsSkeletonLoaded(!isSkeletonLoaded)}>
                  <ButtonText>{isSkeletonLoaded ? "Simulate Loading" : "Simulate Loaded"}</ButtonText>
                </Button>
              </HStack>
              <Text size="xs" className="text-muted-foreground">
                Variants: rounded, circular, sharp | Speeds: 1 to 4
              </Text>
              <HStack space="md" className="items-center">
                <Skeleton variant="circular" className="h-12 w-12" isLoaded={isSkeletonLoaded}>
                  <Avatar className="h-12 w-12">
                    <AvatarFallbackText>JD</AvatarFallbackText>
                  </Avatar>
                </Skeleton>
                <VStack space="xs" className="flex-1">
                  <Skeleton variant="rounded" className="h-4 w-full" isLoaded={isSkeletonLoaded}>
                    <Text size="sm" bold>
                      John Doe (Loaded Profile)
                    </Text>
                  </Skeleton>
                  <Skeleton variant="sharp" className="h-3 w-3/4" isLoaded={isSkeletonLoaded}>
                    <Text size="xs" className="text-muted-foreground">
                      Premium Account Holder
                    </Text>
                  </Skeleton>
                </VStack>
              </HStack>
              <SkeletonText _lines={2} gap={2} isLoaded={isSkeletonLoaded}>
                <Text size="xs">Detailed transaction insights are available for this billing period.</Text>
              </SkeletonText>
            </VStack>
          </Card>
        </VStack>
      )}

      {/* ========================================================================= */}
      {/* CATEGORY 6: OVERLAYS & NAVIGATION                                        */}
      {/* ========================================================================= */}
      {activeCategory === "overlays" && (
        <VStack space="lg">
          <Heading size="lg">6. Overlays & Navigation</Heading>

          {/* Menu Component */}
          <Card size="default">
            <VStack space="sm">
              <Heading size="sm">Menu Component</Heading>
              <Text size="xs" className="text-muted-foreground">
                Floating contextual dropdown menu
              </Text>
              <Menu
                placement="bottom left"
                trigger={({ ...triggerProps }) => (
                  <Button size="sm" variant="outline" {...triggerProps}>
                    <ButtonText>Open Options Menu</ButtonText>
                  </Button>
                )}
              >
                <MenuItem key="export" textValue="Export Data">
                  <MenuItemLabel>Export Transactions CSV</MenuItemLabel>
                </MenuItem>
                <MenuItem key="settings" textValue="Settings">
                  <MenuItemLabel>Budget Settings</MenuItemLabel>
                </MenuItem>
              </Menu>
            </VStack>
          </Card>

          {/* Modal & AlertDialog Triggers */}
          <Card size="default">
            <VStack space="sm">
              <Heading size="sm">Modal & AlertDialog (All Sizes: xs, sm, md, lg, full)</Heading>
              <Text size="xs" className="text-muted-foreground">
                Launch accessible modal dialogs
              </Text>
              <HStack space="xs" className="flex-wrap">
                <Button
                  size="sm"
                  variant="default"
                  onPress={() => {
                    setModalSize("md");
                    setIsModalOpen(true);
                  }}
                >
                  <ButtonText>Open Modal (md)</ButtonText>
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onPress={() => {
                    setAlertDialogSize("md");
                    setIsAlertDialogOpen(true);
                  }}
                >
                  <ButtonText>Open AlertDialog</ButtonText>
                </Button>
              </HStack>
            </VStack>
          </Card>

          {/* Actionsheet Trigger */}
          <Card size="default">
            <VStack space="sm">
              <Heading size="sm">Actionsheet Component</Heading>
              <Text size="xs" className="text-muted-foreground">
                Bottom sliding sheet with drag handle
              </Text>
              <Button size="sm" variant="outline" onPress={() => setIsActionsheetOpen(!isActionsheetOpen)}>
                <ButtonText>{isActionsheetOpen ? "Close Actionsheet" : "Open Actionsheet"}</ButtonText>
              </Button>
              {isActionsheetOpen && (
                <Text size="xs" className="text-primary font-medium">
                  Actionsheet State: Open
                </Text>
              )}
            </VStack>
          </Card>

          {/* BottomSheet Component */}
          <Card size="default">
            <VStack space="sm">
              <Heading size="sm">BottomSheet Component</Heading>
              <Text size="xs" className="text-muted-foreground">
                Gorhom native gesture-driven bottomsheet
              </Text>
              <BottomSheet>
                <BottomSheetTrigger>
                  <Box className="bg-primary p-3 rounded-lg items-center">
                    <Text size="sm" bold className="text-primary-foreground">
                      Swipe Up / Open BottomSheet
                    </Text>
                  </Box>
                </BottomSheetTrigger>
                <BottomSheetPortal snapPoints={["40%"]}>
                  <BottomSheetContent className="p-4 gap-3">
                    <BottomSheetDragIndicator />
                    <Heading size="md">Native Bottom Sheet</Heading>
                    <BottomSheetItem onPress={() => console.log("Item 1")}>
                      <BottomSheetItemText>Export PDF Statement</BottomSheetItemText>
                    </BottomSheetItem>
                    <BottomSheetItem onPress={() => console.log("Item 2")}>
                      <BottomSheetItemText>Sync Cloud Backups</BottomSheetItemText>
                    </BottomSheetItem>
                  </BottomSheetContent>
                </BottomSheetPortal>
              </BottomSheet>
            </VStack>
          </Card>

          {/* Drawer Trigger */}
          <Card size="default">
            <VStack space="sm">
              <Heading size="sm">Drawer (All Anchors & Sizes)</Heading>
              <Text size="xs" className="text-muted-foreground">
                Anchors: right, left, top, bottom | Sizes: sm, md, lg, full
              </Text>
              <HStack space="xs" className="flex-wrap">
                <Button
                  size="sm"
                  variant="outline"
                  onPress={() => {
                    setDrawerAnchor("right");
                    setDrawerSize("md");
                    setIsDrawerOpen(true);
                  }}
                >
                  <ButtonText>Right Drawer</ButtonText>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onPress={() => {
                    setDrawerAnchor("left");
                    setDrawerSize("sm");
                    setIsDrawerOpen(true);
                  }}
                >
                  <ButtonText>Left Drawer</ButtonText>
                </Button>
                {isDrawerOpen && (
                  <Button size="sm" variant="ghost" onPress={() => setIsDrawerOpen(false)}>
                    <ButtonText>Close Drawer</ButtonText>
                  </Button>
                )}
              </HStack>
              {isDrawerOpen && (
                <Text size="xs" className="text-primary font-medium">
                  Drawer State: Active ({drawerAnchor}, {drawerSize})
                </Text>
              )}
            </VStack>
          </Card>
        </VStack>
      )}

      {/* ========================================================================= */}
      {/* OVERLAY DIALOGS (MOUNTED CONDITIONALLY)                                   */}
      {/* ========================================================================= */}

      {/* Modal Dialog */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} size={modalSize}>
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="md">SpendSpot Modal ({modalSize})</Heading>
            <ModalCloseButton onPress={() => setIsModalOpen(false)}>
              <Icon as={CloseIcon} size="sm" />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Text size="sm">This is a standard modal dialog overlay. Supports sizes xs, sm, md, lg, and full.</Text>
          </ModalBody>
          <ModalFooter>
            <Button size="sm" variant="outline" onPress={() => setIsModalOpen(false)}>
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button size="sm" variant="default" onPress={() => setIsModalOpen(false)}>
              <ButtonText>Confirm</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Alert Dialog */}
      <AlertDialog isOpen={isAlertDialogOpen} onClose={() => setIsAlertDialogOpen(false)} size={alertDialogSize}>
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Heading size="md">Delete Category?</Heading>
            <AlertDialogCloseButton onPress={() => setIsAlertDialogOpen(false)}>
              <Icon as={CloseIcon} size="sm" />
            </AlertDialogCloseButton>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text size="sm">Are you sure you want to delete this category? This action cannot be undone.</Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button size="sm" variant="outline" onPress={() => setIsAlertDialogOpen(false)}>
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button size="sm" variant="destructive" onPress={() => setIsAlertDialogOpen(false)}>
              <ButtonText>Delete</ButtonText>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Provider in-line containment showcase */}
      <Card size="sm" className="mt-4">
        <VStack space="xs">
          <Heading size="xs">Tamagui Provider Demonstration</Heading>
          <Provider mode="light">
            <Text size="xs" className="text-muted-foreground">
              Verified: Tamagui Provider design tokens and theme context operational.
            </Text>
          </Provider>
        </VStack>
      </Card>
    </ScrollView>
  );
}
