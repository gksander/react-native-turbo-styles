import * as React from "react";
import { createStyleBuilder, defaultConstraints } from "./lib";
import { DefaultAspectRatios } from "./DefaultAspectRatios";

const { builder: sb } = createStyleBuilder(defaultConstraints);

const App: React.FC = () => {
  return <DefaultAspectRatios />;
};

export default App;
