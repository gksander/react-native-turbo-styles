import * as React from "react";
import { DEFAULT_CONSTRAINTS } from "./lib";
import { sb } from "./myTurboStyles";
import { ScrollView, Text, View } from "react-native";

const getColors = (key: string) => {
  const r = new RegExp(`${key}`);
  return Object.keys(DEFAULT_CONSTRAINTS.COLORS)
    .filter((k) => r.test(k))
    .map((k) => [
      k,
      DEFAULT_CONSTRAINTS.COLORS[k as keyof typeof DEFAULT_CONSTRAINTS.COLORS],
    ]);
};

export const Colors: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={sb("py:4", "px:10")}>
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
          <View style={sb("w:14", "h:8", "shadow:md", `bg:${key}`)} />
          <View style={sb("h:2")} />
          <Text style={sb("text-align:center")}>{color}</Text>
        </View>
      ))}
    </View>
  );
};
