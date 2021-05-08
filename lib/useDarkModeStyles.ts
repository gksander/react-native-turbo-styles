import * as React from "react";
import { Builder, ClassName, Constraints } from "./utilTypes";
import { useColorScheme } from "react-native";

type UseDarkModeStyles = <C extends Constraints>(
  builder: Builder<C>
) => (ops: {
  base: Array<ClassName<C>>;
  dark: Array<ClassName<C>>;
}) => Record<string, any>;

export const useDarkModeStyles: UseDarkModeStyles = (builder) => {
  const colorScheme = useColorScheme();

  return React.useCallback(
    ({ base, dark }) =>
      Object.assign(
        builder(...base),
        colorScheme === "dark" ? builder(...dark) : {}
      ),
    [colorScheme]
  );
};
