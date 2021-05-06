import * as React from "react";
import { constraints, ts } from "./myTurboStyles";
import { Text, View } from "react-native";
import { ConstraintOverride } from "./lib";

const key = "gray";
const r = new RegExp(`${key}`);
const colors = Object.keys(constraints.colors)
  .filter((k) => r.test(k))
  .map((k) => [k, constraints.colors[k as keyof typeof constraints.colors]]);

export const Colors: React.FC = () => {
  return (
    <View
      style={ts(
        "flex:1",
        "flex:row",
        "items:center",
        "justify:between",
        "px:10"
      )}
    >
      {colors.map(([key, color]) => (
        <View key={key}>
          <Text style={{ fontWeight: "300", fontStyle: "italic" }}>{key}</Text>
          <View style={ts("h:2")} />
          <View
            style={ts(
              "w:14",
              "h:14",
              "shadow:md",
              `bg:${key}` as ConstraintOverride<"bg">
            )}
          />
          <View style={ts("h:2")} />
          <Text>{color}</Text>
        </View>
      ))}
    </View>
  );
};
