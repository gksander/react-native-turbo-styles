import * as React from "react";
import { Text, View } from "react-native";
import { DEFAULT_CONSTRAINTS } from "./lib";
import { sb } from "./myTurboStyles";

export const DefaultAspectRatios: React.FC = () => {
  return (
    <View
      style={sb(
        "flex:1",
        "flex:row",
        "items:center",
        "justify:between",
        "px:10"
      )}
    >
      {Object.keys(DEFAULT_CONSTRAINTS.ASPECT_RATIOS).map((key) => (
        <View key={key} style={sb("items:center")}>
          <Text style={sb("text:sm", "color:gray-600")}>aspect:{key}</Text>
          <View
            style={sb(
              "border:hairline",
              "rounded:base",
              "bg:purple-700",
              "shadow:md",
              // @ts-ignore
              `aspect:${key}`,
              "w:20",
              "justify:center",
              "items:center"
            )}
          >
            <Text style={sb("color:white", "font-weight:bold")}>{key}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};
