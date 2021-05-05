import * as React from "react";
import { createStyleBuilder, defaultConstraints } from "./lib";
import { View } from "react-native";

const { useTurboStyles } = createStyleBuilder(defaultConstraints);

const App: React.FC = () => {
  const ts = useTurboStyles();

  return <View style={ts("flex:1", "bg:purple-300")} />;
};

export default App;
