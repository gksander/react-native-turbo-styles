import {
  DEFAULT_CONSTRAINTS,
  defaultColorHandlers,
  defaultHandlers,
} from "./defaultHandlers";
import { createStyleBuilder } from "../createStyleBuilder";
import { createColorHandlers } from "./createColorHandlers";
import { createOpacityHandlers } from "./createOpacityHandlers";

jest.mock("react-native", () => ({
  StyleSheet: {
    hairlineWidth: 0.5,
  },
}));

const { builder: sb } = createStyleBuilder({
  handlers: defaultHandlers,
});

describe("defaultPositionHandlers", () => {
  const cases: [string, object, object][] = [
    ["relative", sb("relative"), { position: "relative" }],
    ["absolute", sb("absolute"), { position: "absolute" }],
    ["hidden", sb("hidden"), { display: "none" }],
    ["visible", sb("visible"), { display: "flex" }],
    ["overflow:visible", sb("overflow:visible"), { overflow: "visible" }],
    ["overflow:hidden", sb("overflow:hidden"), { overflow: "hidden" }],
    ["overflow:scroll", sb("overflow:scroll"), { overflow: "scroll" }],
    ["z:0", sb("z:0"), { zIndex: 0 }],
  ];

  test.each(cases)(
    "builder(...%s)=%s equals %s",
    (_, actualOutput, expectedOutput) => {
      expect(actualOutput).toEqual(expectedOutput);
    }
  );
});
