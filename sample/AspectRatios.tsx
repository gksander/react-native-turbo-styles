import * as React from "react";
import { View } from "react-native";
import { ts } from "./myTurboStyles";

export const AspectRatios: React.FC = () => {
  console.log(ts("shadow:lg"), "shadow?");
  return (
    <View style={ts("flex:1", "justify:center", "items:center")}>
      <View style={ts("w:32", "bg:lime-600", "aspect:1", "shadow:lg")} />
    </View>
  );
};
