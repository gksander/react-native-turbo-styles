import { createStyleBuilder } from "./createStyleBuilder";
import { defaultConstraints } from "./defaultConstraints";

jest.mock("react-native", () => ({
  StyleSheet: {
    hairlineWidth: 0.5,
  },
}));

const makeBasicBuilder = () =>
  createStyleBuilder({
    sizing: { sm: 4, md: 8, lg: 12 },
    colors: {
      red: "#f00",
      blue: "rgb(0, 0, 255)",
    },
    opacities: {
      10: 0.1,
      50: 0.5,
      95: 0.95,
    },
    borderSizes: {
      1: 1,
      2: 2,
      3: 3,
      4: 4,
    },
    borderRadii: {
      sm: 2,
      md: 6,
      full: 9999,
    },
    fontSizes: {
      base: [16, 24],
      lg: [18, 28],
    },
  }).builder;

describe("createStyleBuilder", () => {
  it("handles margin/padding with constraint", () => {
    const builder = makeBasicBuilder();

    expect(builder("m:sm")).toEqual({ margin: 4 });
    expect(builder("mx:md")).toEqual({ marginLeft: 8, marginRight: 8 });
    expect(builder("mb:sm")).toEqual({ marginBottom: 4 });

    expect(builder("p:sm")).toEqual({ padding: 4 });
    expect(builder("px:md")).toEqual({ paddingLeft: 8, paddingRight: 8 });
    expect(builder("pb:sm")).toEqual({ paddingBottom: 4 });
  });

  it("handles margin with override", () => {
    const builder = makeBasicBuilder();

    expect(builder("m:[32]")).toEqual({ margin: 32 });
    expect(builder("mx:[10%]")).toEqual({
      marginLeft: "10%",
      marginRight: "10%",
    });
  });

  it("handles inset/positioning", () => {
    const builder = makeBasicBuilder();
    expect(builder("top:sm")).toEqual({ top: 4 });
  });

  it("handles background color", () => {
    const builder = makeBasicBuilder();
    expect(builder("bg:red")).toEqual({ backgroundColor: "#f00" });
    expect(builder("bg:[blue]")).toEqual({ backgroundColor: "blue" });
  });

  it("handles background opacity", () => {
    const builder = makeBasicBuilder();
    expect(builder("bg:red", "bg-opacity:50")).toEqual({
      backgroundColor: "rgba(255, 0, 0, 0.5)",
    });
  });

  it("handles opacity", () => {
    const builder = makeBasicBuilder();
    expect(builder("opacity:50")).toEqual({ opacity: 0.5 });
  });

  it("handles relative/absolute position", () => {
    const builder = makeBasicBuilder();
    expect(builder("relative")).toEqual({ position: "relative" });
    expect(builder("absolute")).toEqual({ position: "absolute" });
  });

  it("handles border widths", () => {
    const builder = makeBasicBuilder();
    expect(builder("border:2")).toEqual({ borderWidth: 2 });
  });

  it("handles border radius", () => {
    const builder = makeBasicBuilder();
    expect(builder("rounded:md")).toEqual({ borderRadius: 6 });
  });

  it("handles overflow", () => {
    const builder = makeBasicBuilder();
    expect(builder("overflow:hidden")).toEqual({ overflow: "hidden" });
    expect(builder("overflow:scroll")).toEqual({ overflow: "scroll" });
  });

  it("handles justifyContent and alignItems", () => {
    const builder = makeBasicBuilder();
    expect(builder("justify:center")).toEqual({ justifyContent: "center" });
    expect(builder("items:center")).toEqual({ alignItems: "center" });
  });

  it("handles zIndex", () => {
    const builder = makeBasicBuilder();
    expect(builder("z:2")).toEqual({ zIndex: 2 });
  });

  it("handles constrained font sizes", () => {
    const builder = makeBasicBuilder();
    expect(builder("text:base")).toEqual({ fontSize: 16, lineHeight: 24 });
  });

  it("handles flex constraints", () => {
    const builder = makeBasicBuilder();
    expect(builder("flex:1")).toEqual({
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: "0%",
    });
  });

  it("handles row:reverse", () => {
    const builder = makeBasicBuilder();
    expect(builder("flex:row-reverse")).toEqual({
      flexDirection: "row-reverse",
    });
  });

  it("handles defaultConstraints", () => {
    const { builder } = createStyleBuilder(defaultConstraints);
    expect(builder("m:2").margin).toBe(defaultConstraints.sizing["2"]);
  });
});
