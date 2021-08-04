import { createAspectRatioHandlers } from "./createAspectRatioHandlers";
import { defaultAspectRatioHandlers } from "./defaultHandlers";
import { createStyleBuilder } from "../createStyleBuilder";

jest.mock("react-native", () => ({
  StyleSheet: {
    hairlineWidth: 0.5,
  },
}));

const { builder: sb } = createStyleBuilder({
  handlers: defaultAspectRatioHandlers,
});

describe("createAspectRatioHandlers", () => {
  const cases: [string, object, object][] = [
    ["aspect:1", sb("aspect:1"), { aspectRatio: 1 }],
    ["aspect:2-1", sb("aspect:2-1"), { aspectRatio: 2 }],
    ["aspect:1-2", sb("aspect:1-2"), { aspectRatio: 1 / 2 }],
    ["aspect:[1.3]", sb("aspect:[1.3]"), { aspectRatio: 1.3 }],
  ];

  test.each(cases)(
    "builder(...%s)=%s equals %s",
    (_, actualOutput, expectedOutput) => {
      expect(actualOutput).toEqual(expectedOutput);
    }
  );

  it("allows custom constraints", () => {
    const { builder } = createStyleBuilder({
      handlers: createAspectRatioHandlers({ foo: [1, 1], bar: [3, 7] }),
    });

    expect(builder("aspect:foo")).toEqual({ aspectRatio: 1 });
    expect(builder("aspect:bar")).toEqual({ aspectRatio: 3 / 7 });
    // @ts-expect-error
    expect(builder("aspect:1")).toEqual({});
  });
});
