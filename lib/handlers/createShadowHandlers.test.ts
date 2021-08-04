import { createStyleBuilder } from "../createStyleBuilder";
import {
  DEFAULT_CONSTRAINTS,
  defaultAspectRatioHandlers,
  defaultHandlers,
} from "./defaultHandlers";
import { createAspectRatioHandlers } from "./createAspectRatioHandlers";
import { createBorderHandlers } from "./createBorderHandlers";

let platform = "android";

jest.mock("react-native", () => ({
  StyleSheet: {
    hairlineWidth: 0.5,
  },
  Platform: {
    select: (args: { android: any; default: any }) =>
      platform === "android" ? args?.android : args?.default,
  },
}));

const { builder: sb } = createStyleBuilder({
  handlers: defaultHandlers,
});
const C = DEFAULT_CONSTRAINTS.SHADOWS;

describe("createBorderHandlers", () => {
  it("handles shadows, platform specific", () => {
    platform = "android";
    expect(sb("shadow:sm")).toEqual({
      elevation: C.sm.android,
    });

    platform = "ios";
    const [width, height, shadowRadius, shadowOpacity] = C.md.ios;
    expect(sb("shadow:md")).toEqual({
      shadowOffset: { width, height },
      shadowOpacity,
      shadowRadius,
    });
  });

  // it("allows for custom constraints", () => {
  //   const { builder } = createStyleBuilder({
  //     handlers: createBorderHandlers({ foo: 6, bar: 9 }),
  //   });
  //
  //   expect(builder("border:foo")).toEqual({ borderWidth: 6 });
  //   expect(builder("border:bar")).toEqual({ borderWidth: 9 });
  //   // @ts-expect-error
  //   expect(builder("border:baz")).toEqual({});
  // });
});
