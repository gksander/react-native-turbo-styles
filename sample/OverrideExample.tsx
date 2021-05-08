import * as React from "react";
import { View } from "react-native";
import { sb } from "./myTurboStyles";

export const OverrideExample: React.FC = () => {
  return (
    <View style={sb("flex:1", "bg:gray-300", "justify:center", "items:center")}>
      <View style={sb("w:32", "h:32", "bg:white")}>
        <View
          style={sb(
            "absolute",
            "h:12",
            "bg:purple-500",
            "top:[-10]",
            "inset-x:[-10]"
          )}
        />
      </View>
    </View>
  );
};
