import { defaultSpacingHandlers } from "./defaultSpacingHandlers";
import { createStyleBuilder } from "../createStyleBuilder";

const builder = createStyleBuilder({
  handlers: {
    ...defaultSpacingHandlers(),
  },
}).builder;

describe("defaultSpacingHandlers", () => {
  const cases: [Parameters<typeof builder>, object][] = [
    [["m:1"], { margin: defaultSpacingHandlers.DEFAULT_CONSTRAINTS["1"] }],
  ];

  test.each(cases)("builder(...%s) returns %s", (classList, expectedOutput) => {
    // @ts-ignore
    expect(builder(...classList)).toEqual(expectedOutput);
  });
});
