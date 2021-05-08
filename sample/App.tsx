import * as React from "react";
import { View, Image, Text } from "react-native";
import { Demo } from "./Demo";
import { createStyleBuilder, defaultConstraints } from "./lib";

const { builder: sb } = createStyleBuilder(defaultConstraints);

const App: React.FC = () => {
  return <Demo />;
};

export default App;
