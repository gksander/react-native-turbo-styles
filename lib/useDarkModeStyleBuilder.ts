import * as React from "react";
import { useColorScheme } from "react-native";

export const useDarkModeStyleBuilder = <
  Builder extends (...args: any[]) => object
>(
  builder: Builder
) => {
  const colorScheme = useColorScheme();

  return React.useCallback(
    (...args: Parameters<Builder>) => {
      return colorScheme === "dark" ? builder(...args) : {};
    },
    [builder, colorScheme]
  );
};
