import * as React from "react";
import { View } from "react-native";
import { sb } from "./myTurboStyles";

export const AspectRatios: React.FC = () => {
  console.log(sb("shadow:lg"), "shadow?");
  return (
    <View style={sb("flex:1", "justify:center", "items:center")}>
      <View style={sb("w:32", "bg:lime-600", "aspect:1", "shadow:lg")} />
    </View>
  );
};
