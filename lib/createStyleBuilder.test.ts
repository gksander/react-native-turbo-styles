import { createStyleBuilder } from "./createStyleBuilder";
import { defaultConstraints } from "./defaultConstraints";

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

const makeBasicBuilder = () => createStyleBuilder(defaultConstraints).builder;
const {
  sizing,
  colors,
  borderSizes,
  borderRadii,
  fontSizes,
  opacities,
} = defaultConstraints;

describe("createStyleBuilder", () => {
  beforeEach(() => {
    platform = "android";
  });

  it("handles margin/padding with constraint", () => {
    const builder = makeBasicBuilder();

    expect(builder("m:2")).toEqual({ margin: sizing["2"] });
    expect(builder("mx:4")).toEqual({
      marginLeft: sizing["4"],
      marginRight: sizing["4"],
    });
    expect(builder("mb:2")).toEqual({
      marginBottom: sizing["2"],
    });

    expect(builder("p:2")).toEqual({ padding: sizing["2"] });
    expect(builder("px:4")).toEqual({
      paddingLeft: sizing["4"],
      paddingRight: sizing["4"],
    });
    expect(builder("pb:2")).toEqual({
      paddingBottom: sizing["2"],
    });
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
    expect(builder("top:2")).toEqual({ top: sizing["2"] });
  });

  it("handles background color", () => {
    const builder = makeBasicBuilder();
    expect(builder("bg:red-100")).toEqual({
      backgroundColor: colors["red-100"],
    });
    expect(builder("bg:[blue]")).toEqual({ backgroundColor: "blue" });
  });

  it("handles background opacity", () => {
    const builder = makeBasicBuilder();
    expect(builder("bg:red-100", "bg-opacity:50")).toEqual({
      backgroundColor: "rgba(254, 226, 226, 0.5)",
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
    expect(builder("border:2")).toEqual({ borderWidth: borderSizes["2"] });
  });

  it("handles border radius", () => {
    const builder = makeBasicBuilder();
    expect(builder("rounded:md")).toEqual({ borderRadius: borderRadii["md"] });
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
    expect(builder("text:sm")).toEqual({
      fontSize: fontSizes["sm"][0],
      lineHeight: fontSizes["sm"][1],
    });
  });

  it("handles constrained font weights", () => {
    const builder = makeBasicBuilder();
    expect(builder("font-weight:bold")).toEqual({
      fontWeight: defaultConstraints.fontWeights["bold"],
    });
  });

  it("handles italic class", () => {
    const builder = makeBasicBuilder();
    expect(builder("italic")).toEqual({
      fontStyle: "italic",
    });
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

  it("handles shadows", () => {
    const builder1 = makeBasicBuilder();

    expect(builder1("shadow:sm")).toEqual({
      elevation: defaultConstraints.shadows.sm.android,
    });

    platform = "ios";
    const builder2 = makeBasicBuilder();
    const [
      width,
      height,
      shadowRadius,
      shadowOpacity,
    ] = defaultConstraints.shadows["sm"].ios;
    expect(builder2("shadow:sm")).toEqual({
      shadowOffset: { width, height },
      shadowOpacity,
      shadowRadius,
    });
  });
});
