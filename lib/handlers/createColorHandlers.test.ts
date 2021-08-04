import {
  DEFAULT_CONSTRAINTS,
  defaultColorHandlers,
  defaultHandlers,
} from "./defaultHandlers";
import { createStyleBuilder } from "../createStyleBuilder";
import { TextStyle, ViewStyle } from "react-native";

jest.mock("react-native", () => ({
  StyleSheet: {
    hairlineWidth: 0.5,
  },
}));

const { builder: sb } = createStyleBuilder({
  handlers: defaultHandlers,
});
const C = DEFAULT_CONSTRAINTS.COLORS;

describe("createColorHandlers", () => {
  const cases: [string, object, object][] = [
    // bg:
    ["bg:red-300", sb("bg:red-300"), { backgroundColor: C["red-300"] }],
    ["bg:black", sb("bg:black"), { backgroundColor: C["black"] }],
    ["bg:[pink]", sb("bg:[pink]"), { backgroundColor: "pink" }],
    // TODO: Rest of color handlers!
  ];

  test.each(cases)(
    "builder(...%s)=%s equals %s",
    (_, actualOutput, expectedOutput) => {
      expect(actualOutput).toEqual(expectedOutput);
    }
  );

  // it("allows custom constraints", () => {
  //   const { builder } = createStyleBuilder({
  //     handlers: createAspectRatioHandlers({ foo: [1, 1], bar: [3, 7] }),
  //   });
  //
  //   expect(builder("aspect:foo")).toEqual({ aspectRatio: 1 });
  //   expect(builder("aspect:bar")).toEqual({ aspectRatio: 3 / 7 });
  //   // @ts-expect-error
  //   expect(builder("aspect:1")).toEqual({});
  // });
});
