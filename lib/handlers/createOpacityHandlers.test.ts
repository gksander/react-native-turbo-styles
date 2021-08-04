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
const C = DEFAULT_CONSTRAINTS.OPACITIES;

const myStyle = sb("bg:red-100", "bg-opacity:50");

describe("createOpacityHandlers", () => {
  const cases: [string, object, object][] = [
    // opacity:
    ["opacity:50", sb("opacity:50"), { opacity: C["50"] }],
    ["opacity:0", sb("opacity:0"), { opacity: C["0"] }],
    ["opacity:[.33]", sb("opacity:[.33]"), { opacity: 0.33 }],
    // bg-opacity:
    [
      "bg:red-100 bg-opacity:50",
      sb("bg:red-100", "bg-opacity:50"),
      { backgroundColor: "rgba(254, 226, 226, 0.5)" },
    ],
  ];

  test.each(cases)(
    "builder(...%s)=%s equals %s",
    (_, actualOutput, expectedOutput) => {
      expect(actualOutput).toEqual(expectedOutput);
    }
  );

  it("allows custom constraints", () => {
    const { builder } = createStyleBuilder({
      handlers: {
        ...defaultColorHandlers,
        ...createOpacityHandlers({ half: 0.5, notmuch: 0.05 }),
      },
    });

    expect(builder("opacity:notmuch")).toEqual({ opacity: 0.05 });
    expect(builder("bg:red-300", "bg-opacity:half")).toEqual({
      backgroundColor: "rgba(252, 165, 165, 0.5)",
    });
    // @ts-expect-error
    expect(builder("opacity:50")).toEqual({});
  });
});
