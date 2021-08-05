import * as React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { DEFAULT_CONSTRAINTS } from "./lib";
import { sb } from "./myTurboStyles";

type Key = keyof typeof DEFAULT_CONSTRAINTS.OPACITIES;

export const DefaultOpacities: React.FC = () => {
  return (
    <View style={sb("flex:1", "bg:gray-300")}>
      <SafeAreaView style={sb("flex:1", "flex:row")}>
        {Object.keys(DEFAULT_CONSTRAINTS.OPACITIES).map((key) => (
          <View
            key={key}
            style={sb(
              "flex:1",
              "bg:purple-800",
              // @ts-ignore
              `bg-opacity:${key as Key}`,
              "justify:center",
              "items:center"
            )}
          >
            <Text>{key}</Text>
          </View>
        ))}
      </SafeAreaView>
    </View>
  );
};
