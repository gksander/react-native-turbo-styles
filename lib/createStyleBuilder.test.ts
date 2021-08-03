import { createStyleBuilder } from "./createStyleBuilder";
import { FlexStyle, TextStyle } from "react-native";
import { cleanMaybeNumberString } from "./utils";
import { defaultSpacingHandlers } from "./handlers/defaultSpacingHandlers";

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

  it("maintains referential equality", () => {
    const { builder } = createStyleBuilder({
      handlers: defaultSpacingHandlers(),
    });

    const s1 = builder("mx:3", "my:12");
    const s2 = builder("mx:3", "my:12");
    const s3 = builder("mx:3", "my:10");

    expect(s1).toBe(s2);
    expect(s1).not.toBe(s3);
  });
});
