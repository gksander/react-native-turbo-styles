import * as React from "react";
import { Text, View } from "react-native";
import { constraints, sb } from "./myTurboStyles";

type DefaultBorderSizesProps = {};

export const DefaultBorderSizes: React.FC<DefaultBorderSizesProps> = () => {
  return (
    <View
      style={sb(
        "flex:1",
        "flex:row",
        "items:center",
        "justify:between",
        "px:20",
        "bg:gray-300"
      )}
    >
      {Object.keys(constraints.borderSizes).map((key) => (
        <View key={key} style={sb("items:center")}>
          <Text style={sb("text:sm", "color:gray-600")}>border:{key}</Text>
          <View
            style={sb(
              "rounded:lg",
              "bg:white",
              "border-color:purple-700",
              // @ts-ignore
              `border:${key}`,
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
