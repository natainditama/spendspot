import { Image } from "expo-image";
import { ScrollView } from "react-native";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@spendspot/ui-components/alert-dialog";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@spendspot/ui-components/avatar";
import { Badge } from "@spendspot/ui-components/badge";
import { Button } from "@spendspot/ui-components/button";
import {
  Card,
  CardAction,
  CardBackground,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@spendspot/ui-components/card";
import { Checkbox } from "@spendspot/ui-components/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@spendspot/ui-components/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@spendspot/ui-components/dropdown-menu";
import { Plus } from "@spendspot/ui-components/icons";
import { Input } from "@spendspot/ui-components/input";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@spendspot/ui-components/item";
import { Label } from "@spendspot/ui-components/label";
import { Progress } from "@spendspot/ui-components/progress";
import { RadioGroup, RadioGroupItem } from "@spendspot/ui-components/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@spendspot/ui-components/select";
import { Separator } from "@spendspot/ui-components/separator";
import { Slider } from "@spendspot/ui-components/slider";
import { XStack, YStack } from "@spendspot/ui-components/stacks";
import { Switch } from "@spendspot/ui-components/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@spendspot/ui-components/tabs";
import { Textarea } from "@spendspot/ui-components/textarea";
import { toast } from "@spendspot/ui-components/toast";
import { ToggleGroup, ToggleGroupItem } from "@spendspot/ui-components/toggle-group";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@spendspot/ui-components/tooltip";

/**
 * Comprehensive Showcase demonstrating all 41 SpendSpot UI Components.
 * Systematically exhibits every size, variant, color action, and state.
 */
export default function ComponentShowcase() {
  return (
    <ScrollView>
      <YStack flex={1} gap="$4" padding="$4" paddingVertical="$8" backgroundColor="$background">
        <XStack gap="$2" flexWrap="wrap">
          <Badge>Badge</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="ghost">Ghost</Badge>
          <Badge variant="link">Link</Badge>
        </XStack>
        <XStack gap="$2" flexWrap="wrap">
          <Button>Primary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button buttonSize="sm">Destructive</Button>
        </XStack>
        <XStack gap="$2" flexWrap="wrap">
          <Select defaultValue="">
            <SelectTrigger flex={1} invalid>
              <SelectValue placeholder="Select a fruit..." />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple" index={0}>
                  Apple
                </SelectItem>
                <SelectItem value="banana" index={1}>
                  Banana
                </SelectItem>
                <SelectItem value="mango" index={2}>
                  Mango
                </SelectItem>
                <SelectItem value="orange" index={3}>
                  Orange
                </SelectItem>
                <SelectItem value="grape" index={4}>
                  Grape
                </SelectItem>
                <SelectItem value="watermelon" index={5}>
                  Watermelon
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Input placeholder="Enter your email..." flex={1} invalid />
        </XStack>
        <Textarea placeholder="Type your message here..." />

        <Tabs defaultValue="account">
          <TabsList variant="line">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardHeader paddingBottom="$5">
                <CardTitle>Account</CardTitle>
                <CardDescription>Manage your account settings and preferences.</CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader paddingBottom="$5">
                <CardTitle>Password</CardTitle>
                <CardDescription>Change your password credentials securely.</CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>
        </Tabs>

        <YStack gap="$3">
          <Progress value={0} />
          <Progress value={33} />
          <Progress value={66} />
          <Progress value={100} />
          <Progress value={50} size="sm" />
          <Progress value={50} size="lg" />
        </YStack>

        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
            <CardAction>
              <Button variant="secondary" buttonSize="xs">
                Action
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <Image
              source="https://picsum.photos/seed/696/3000/2000"
              contentFit="cover"
              transition={1000}
              style={{ width: "100%", height: 200 }}
            />
          </CardContent>
          <CardFooter>
            <Button>Cancel</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
            <CardAction flexDirection="row" gap="$2">
              <Button icon={Plus} variant="secondary" buttonSize="icon"></Button>
              <Button icon={<Plus size="$1" />} variant="secondary" buttonSize="icon"></Button>
            </CardAction>
          </CardHeader>
          <CardBackground>
            <Image
              source="https://picsum.photos/seed/696/3000/2000"
              contentFit="cover"
              transition={1000}
              style={{ width: "100%", height: "100%" }}
            />
          </CardBackground>
          <CardFooter display="flex" flexDirection="column">
            <Button width="100%">Cancel</Button>
            <Button width="100%" variant="outline">
              Submit
            </Button>
          </CardFooter>
        </Card>

        <XStack gap="$4" alignItems="center">
          <Switch />
          <Switch defaultChecked />
          <Switch size="sm" />
          <Switch size="sm" defaultChecked />
          <Switch invalid />
          <Switch disabled />
        </XStack>

        <YStack gap="$3">
          <Progress value={0} />
          <Progress value={33} />
          <Progress value={66} />
          <Progress value={100} />
          <Progress value={50} size="sm" />
          <Progress value={50} size="lg" />
        </YStack>

        <Separator />

        <XStack gap="$4" alignItems="center" flexWrap="wrap">
          <Avatar size="sm">
            <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" />
            <AvatarFallback>SM</AvatarFallback>
            <AvatarBadge />
          </Avatar>

          <Avatar size="default">
            <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" />
            <AvatarFallback>DF</AvatarFallback>
            <AvatarBadge />
          </Avatar>

          <Avatar size="lg">
            <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" />
            <AvatarFallback>LG</AvatarFallback>
            <AvatarBadge />
          </Avatar>

          <Avatar size="default">
            <AvatarFallback>FB</AvatarFallback>
          </Avatar>

          <AvatarGroup>
            <Avatar size="default">
              <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <Avatar size="default">
              <AvatarFallback>B</AvatarFallback>
            </Avatar>
            <Avatar size="default">
              <AvatarFallback>C</AvatarFallback>
            </Avatar>
            <AvatarGroupCount size="default">+3</AvatarGroupCount>
          </AvatarGroup>
        </XStack>

        <Separator />

        <YStack gap="$3">
          <XStack gap="$3" alignItems="center">
            <Checkbox id="terms" defaultChecked />
            <Label htmlFor="terms">Accept terms and conditions</Label>
          </XStack>
          <XStack gap="$3" alignItems="center">
            <Checkbox id="marketing" size="sm" />
            <Label htmlFor="marketing">Receive marketing updates (sm)</Label>
          </XStack>
          <XStack gap="$3" alignItems="center">
            <Checkbox id="invalid-cb" invalid />
            <Label htmlFor="invalid-cb">Required agreement (invalid)</Label>
          </XStack>
          <XStack gap="$3" alignItems="center">
            <Checkbox id="disabled-cb" disabled />
            <Label htmlFor="disabled-cb" disabled>
              Disabled option
            </Label>
          </XStack>
        </YStack>

        <Separator />

        <RadioGroup defaultValue="default">
          <XStack gap="$3" alignItems="center">
            <RadioGroupItem value="default" id="r1" />
            <Label htmlFor="r1">Default Option</Label>
          </XStack>
          <XStack gap="$3" alignItems="center">
            <RadioGroupItem value="comfortable" id="r2" />
            <Label htmlFor="r2">Comfortable View</Label>
          </XStack>
          <XStack gap="$3" alignItems="center">
            <RadioGroupItem value="compact" id="r3" invalid />
            <Label htmlFor="r3">Compact View (invalid)</Label>
          </XStack>
          <XStack gap="$3" alignItems="center">
            <RadioGroupItem value="disabled" id="r4" disabled />
            <Label htmlFor="r4" disabled>
              Disabled Choice
            </Label>
          </XStack>
        </RadioGroup>

        <Separator />

        <YStack gap="$4">
          <Slider defaultValue={[50]} max={100} step={1} />
          <Slider defaultValue={[25, 75]} max={100} step={1} size="sm" />
          <Slider defaultValue={[60]} max={100} step={1} size="lg" />
          <Slider defaultValue={[30]} max={100} step={1} disabled />
        </YStack>

        <Separator />

        <XStack gap="$3" flexWrap="wrap">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel asChild width={"100%"}>
                  <Button variant="outline" width={"100%"}>
                    Cancel
                  </Button>
                </AlertDialogCancel>
                <AlertDialogAction asChild width={"100%"}>
                  <Button variant="destructive" width={"100%"}>
                    Continue
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>Make changes to your profile here. Click save when done.</DialogDescription>
              </DialogHeader>
              <YStack gap="$2">
                <Input placeholder="Name" />
                <Input placeholder="Username" />
              </YStack>
              <DialogFooter>
                <DialogClose asChild>
                  <Button buttonSize="sm">Save changes</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary">Open Menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem key="profile">
                  Profile
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem key="billing">
                  Billing
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem key="settings">
                  Settings
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem key="logout" destructive>
                Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="outline"
            onPress={() => {
              toast.error("Event has been created", {
                description: "Sunday, December 03, 2026 at 9:00 AM",
              });
            }}
          >
            Show Toast
          </Button>
        </XStack>

        <Separator />

        <XStack gap="$4" alignItems="center" flexWrap="wrap">
          <ToggleGroup type="single" defaultValue="left">
            <ToggleGroupItem value="left">Left</ToggleGroupItem>
            <ToggleGroupItem value="center">Center</ToggleGroupItem>
            <ToggleGroupItem value="right">Right</ToggleGroupItem>
          </ToggleGroup>

          <ToggleGroup type="multiple" variant="outline">
            <ToggleGroupItem value="bold">B</ToggleGroupItem>
            <ToggleGroupItem value="italic">I</ToggleGroupItem>
            <ToggleGroupItem value="underline">U</ToggleGroupItem>
          </ToggleGroup>
        </XStack>

        <Separator />

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Hover for Tooltip</Button>
            </TooltipTrigger>
            <TooltipContent>Add to library</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Separator />

        <ItemGroup>
          <Item variant="outline">
            <ItemMedia variant="icon">
              <Plus size="$4" color="$primary" />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Two-factor Authentication</ItemTitle>
              <ItemDescription>Add an extra layer of security to your account.</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Switch defaultChecked size="sm" />
            </ItemActions>
          </Item>

          <Item variant="muted">
            <ItemContent>
              <ItemTitle>Email Notifications</ItemTitle>
              <ItemDescription>Receive weekly digest and transaction alerts.</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Switch size="sm" />
            </ItemActions>
          </Item>
        </ItemGroup>
      </YStack>
    </ScrollView>
  );
}
