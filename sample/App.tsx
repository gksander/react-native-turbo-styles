import * as React from "react";
import { createStyleBuilder, defaultConstraints } from "./lib";
import { DefaultAspectRatios } from "./DefaultAspectRatios";
import { DefaultBorderRadii } from "./DefaultBorderRadii";

const { builder: sb } = createStyleBuilder(defaultConstraints);

const App: React.FC = () => {
  return <DefaultBorderRadii />;
};

export default App;
