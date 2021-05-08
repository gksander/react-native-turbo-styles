import * as React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { constraints, sb } from "./myTurboStyles";

type DefaultFontSizesProps = {};

export const DefaultFontSizes: React.FC<DefaultFontSizesProps> = () => {
  return (
    <SafeAreaView style={sb("flex:1")}>
      {Object.keys(constraints.fontSizes).map((key) => (
        <View
          key={key}
          style={sb("px:2", "py:1", "flex:grow", "overflow:hidden")}
        >
          <Text style={sb("text:sm", "color:gray-600")}>text:{key}</Text>
          <Text style={sb(`text:${key}`)} numberOfLines={1}>
            The quick brown fox...
          </Text>
        </View>
      ))}
    </SafeAreaView>
  );
};
