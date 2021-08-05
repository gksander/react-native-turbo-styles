import * as React from "react";
import { Text, View } from "react-native";
import { DEFAULT_CONSTRAINTS } from "./lib";
import { sb } from "./myTurboStyles";

export const DefaultShadows: React.FC = () => {
  return (
    <View
      style={sb(
        "flex:1",
        "flex:row",
        "items:center",
        "justify:between",
        "px:20",
        "bg:purple-100"
      )}
    >
      {Object.keys(DEFAULT_CONSTRAINTS.SHADOWS).map((key) => (
        <View key={key} style={sb("items:center")}>
          <Text style={sb("text:sm", "color:gray-600")}>shadow:{key}</Text>
          <View
            style={sb(
              "border:hairline",
              "bg:white",
              // @ts-ignore
              `shadow:${key}`,
              "w:20",
              "h:20",
              "justify:center",
              "items:center"
            )}
          >
            <Text>{key}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};
