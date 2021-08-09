import * as React from "react";
import { createStyleBuilder, defaultHandlers } from "./lib";
import { Text, View } from "react-native";

const { builder: ts } = createStyleBuilder({ handlers: defaultHandlers });

export const DefaultHandlersExample: React.FC = () => {
  return (
    <View style={ts("flex:1", "justify:center", "items:center")}>
      <Text style={ts("font-weight:bold", "text:3xl", "bg:purple-800")}>
        NICE!
      </Text>
    </View>
  );
};
