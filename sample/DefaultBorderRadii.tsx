import * as React from "react";
import { Text, View } from "react-native";
import { constraints, sb } from "./myTurboStyles";

type DefaultBorderRadiiProps = {};

export const DefaultBorderRadii: React.FC<DefaultBorderRadiiProps> = () => {
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
      {Object.keys(constraints.borderRadii).map((key) => (
        <View key={key} style={sb("items:center")}>
          <Text style={sb("text:sm", "color:gray-600")}>border:{key}</Text>
          <View
            style={sb(
              "border:2",
              "border-color:purple-700",
              // @ts-ignore
              `rounded:${key}`,
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
