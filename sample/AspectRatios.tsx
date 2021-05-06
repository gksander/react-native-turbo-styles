import * as React from "react";
import { View } from "react-native";
import { ts } from "./myTurboStyles";

export const AspectRatios: React.FC = () => {
  return (
    <View style={ts("flex:1", "justify:center", "items:center")}>
      <View style={ts("w:32", "bg:red-300", "aspect:1")} />
    </View>
  );
};
