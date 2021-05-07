import { createStyleBuilder, defaultConstraints, flattenColor } from "./lib";

export const { builder: ts, useTurboStyles, constraints } = createStyleBuilder({
  ...defaultConstraints,
  colors: {
    ...defaultConstraints.colors,
    ...flattenColor("lime", "lime"),
  },
});
