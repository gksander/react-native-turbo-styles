import { createStyleBuilder } from "./createStyleBuilder";
import { FlexStyle, TextStyle } from "react-native";
import { cleanMaybeNumberString } from "./utils";

describe("createStyleBuilder", () => {
  it("creates simple builder", () => {
    const { builder } = createStyleBuilder({
      handlers: {
        p: (x: "1" | "2" | "3") =>
          <FlexStyle>{ padding: cleanMaybeNumberString(x) },
      },
    });

    expect(builder("p:3")).toEqual({ padding: 3 });
    // @ts-expect-error
    expect(builder("m:3")).toEqual({});
  });

  it("handles no-arg handlers", () => {
    const { builder } = createStyleBuilder({
      handlers: {
        capitalize: () => <TextStyle>{ textTransform: "capitalize" },
      },
    });

    expect(builder("capitalize")).toEqual({ textTransform: "capitalize" });
  });
});
