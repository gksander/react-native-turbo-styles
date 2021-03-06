import * as React from "react";
import { constraints, sb } from "./myTurboStyles";
import { ScrollView, Text, View } from "react-native";
import { ConstraintOverride, useDarkModeStyles } from "./lib";

const getColors = (key: string) => {
  const r = new RegExp(`${key}`);
  return Object.keys(constraints.colors)
    .filter((k) => r.test(k))
    .map((k) => [k, constraints.colors[k as keyof typeof constraints.colors]]);
};

export const Colors: React.FC = () => {
  const dm = useDarkModeStyles(sb);

  return (
    <ScrollView
      contentContainerStyle={dm({
        base: ["py:4", "px:10"],
        dark: ["bg:gray-900"],
      })}
    >
      <ColorList color="gray" />
      <ColorList color="red" />
      <ColorList color="green" />
      <ColorList color="blue" />
      <ColorList color="indigo" />
      <ColorList color="purple" />
      <ColorList color="pink" />
    </ScrollView>
  );
};

const ColorList: React.FC<{ color: string }> = ({ color }) => {
  return (
    <View
      style={sb(
        "flex:1",
        "flex:row",
        "items:center",
        "justify:between",
        "mb:4"
      )}
    >
      {getColors(color).map(([key, color]) => (
        <View key={key} style={sb("items:center")}>
          <Text style={sb("font-weight:bold", "text-align:center", "text:xs")}>
            {key}
          </Text>
          <View style={sb("h:2")} />
          <View
            style={sb(
              "w:14",
              "h:8",
              "shadow:md",
              `bg:${key}` as ConstraintOverride<"bg">
            )}
          />
          <View style={sb("h:2")} />
          <Text style={sb("text-align:center")}>{color}</Text>
        </View>
      ))}
    </View>
  );
};
