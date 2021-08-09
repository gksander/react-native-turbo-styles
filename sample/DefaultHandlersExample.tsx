import * as React from "react";
import { Text, View } from "react-native";
import { sb } from "./myTurboStyles";

export const DefaultHandlersExample: React.FC = () => {
  return (
    <View style={sb("flex:1", "justify:center", "items:center")}>
      <Text style={sb("prettyStuff")}>FOOBAR</Text>
    </View>
  );
};
