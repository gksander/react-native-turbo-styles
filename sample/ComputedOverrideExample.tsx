import * as React from "react";
import { useWindowDimensions, View } from "react-native";
import { ts } from "./myTurboStyles";
import { ConstraintOverride } from "./lib";

export const ComputedOverrideExample: React.FC = () => {
  const { width } = useWindowDimensions();
  const rectWidth = (width - 32) / 3;

  return (
    <View style={ts("flex:1", "bg:gray-200", "justify:center", "items:center")}>
      <View
        style={ts(
          `w:[${rectWidth}]` as ConstraintOverride<"w">,
          "h:10",
          "bg:red-300"
        )}
      />
    </View>
  );
};
