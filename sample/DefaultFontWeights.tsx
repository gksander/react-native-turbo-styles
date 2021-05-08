import * as React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { constraints, sb } from "./myTurboStyles";

export const DefaultFontWeights: React.FC = () => {
  return (
    <SafeAreaView style={sb()}>
      {Object.keys(constraints.fontWeights).map((key) => (
        <View
          key={key}
          style={sb("px:2", "py:2", "flex:grow", "overflow:hidden")}
        >
          <Text style={sb("text:sm", "color:gray-600")}>font-weight:{key}</Text>
          <Text style={sb(`font-weight:${key}`)} numberOfLines={1}>
            The quick brown fox...
          </Text>
        </View>
      ))}
    </SafeAreaView>
  );
};
