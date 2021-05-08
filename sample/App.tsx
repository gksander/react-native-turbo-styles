import * as React from "react";
import { createStyleBuilder, defaultConstraints } from "./lib";
import { DefaultAspectRatios } from "./DefaultAspectRatios";
import { DefaultBorderRadii } from "./DefaultBorderRadii";
import { DefaultBorderSizes } from "./DefaultBorderSizes";

const { builder: sb } = createStyleBuilder(defaultConstraints);

const App: React.FC = () => {
  return <DefaultBorderSizes />;
};

export default App;
