import * as React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { constraints, sb } from "./myTurboStyles";
import { ConstraintOverride } from "./lib";

type Key = keyof typeof constraints.opacities;

export const DefaultOpacities: React.FC = () => {
  return (
    <View style={sb("flex:1", "bg:gray-300")}>
      <SafeAreaView style={sb("flex:1", "flex:row")}>
        {Object.keys(constraints.opacities).map((key) => (
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
