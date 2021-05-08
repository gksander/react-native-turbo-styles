import * as React from "react";
import { View, Image, Text } from "react-native";
import { createStyleBuilder, defaultConstraints } from "./lib";

const { builder: sb } = createStyleBuilder(defaultConstraints);

export const Demo: React.FC = () => {
  return (
    <View style={sb("bg:gray-300", "flex:1", "justify:center", "px:3")}>
      <View style={sb("bg:white", "flex:row", "shadow:lg", "rounded:lg")}>
        <View style={sb("w:1/3", "aspect:1", "overflow:hidden", "p:3")}>
          <Image
            source={require("./turbo-icon.png")}
            style={sb("w:full", "h:full", "resize:contain")}
          />
        </View>
        <View style={sb("p:3", "flex:1")}>
          <Text style={sb("text:base", "color:gray-600", "font-weight:bold")}>
            React Native TurboStyles
          </Text>
          <View style={sb("h:2")} />
          <Text
            style={sb(
              "flex:shrink",
              "flex:wrap",
              "italic",
              "color:gray-500",
              "text:base"
            )}
          >
            Turbocharge your React Native styling.
          </Text>
        </View>
      </View>
    </View>
  );
};
