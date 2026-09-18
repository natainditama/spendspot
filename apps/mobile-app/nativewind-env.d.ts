/// <reference types="react-native-css/types" />

import "react-native";

declare module "react-native" {
  interface PressableProps {
    className?: string;
  }
  interface ActivityIndicatorProps {
    className?: string;
  }
}
