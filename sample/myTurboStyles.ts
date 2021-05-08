import { createStyleBuilder, defaultConstraints, flattenColor } from "./lib";

export const { builder: sb, constraints } = createStyleBuilder({
  ...defaultConstraints,
  colors: {
    ...defaultConstraints.colors,
    ...flattenColor("lime", "lime"),
  },
});
