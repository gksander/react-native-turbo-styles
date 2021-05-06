import { createStyleBuilder } from "./createStyleBuilder";
import { defaultConstraints } from "./defaultConstraints";
import { StyleName } from "./utilTypes";

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

const makeDefaultBuilder = () => createStyleBuilder(defaultConstraints).builder;
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

  const cases: [StyleName<typeof defaultConstraints>[], object][] = [
    // m:
    [["m:0"], { margin: sizing["0"] }],
    [["m:2"], { margin: sizing["2"] }],
    [["m:[3]"], { margin: 3 }],
    // -m:
    [["-m:0"], { margin: -sizing["0"] }],
    [["-m:2"], { margin: -sizing["2"] }],
    [["-m:[3]"], { margin: -3 }],
    // mx:
    [["mx:0"], { marginLeft: sizing["0"], marginRight: sizing["0"] }],
    [["mx:2"], { marginLeft: sizing["2"], marginRight: sizing["2"] }],
    [["mx:[3]"], { marginLeft: 3, marginRight: 3 }],
    // -mx:
    [["-mx:0"], { marginLeft: -sizing["0"], marginRight: -sizing["0"] }],
    [["-mx:2"], { marginLeft: -sizing["2"], marginRight: -sizing["2"] }],
    [["-mx:[3]"], { marginLeft: -3, marginRight: -3 }],
    // my:
    [["my:0"], { marginTop: sizing["0"], marginBottom: sizing["0"] }],
    [["my:2"], { marginTop: sizing["2"], marginBottom: sizing["2"] }],
    [["my:[3]"], { marginTop: 3, marginBottom: 3 }],
    // -my:
    [["-my:0"], { marginTop: -sizing["0"], marginBottom: -sizing["0"] }],
    [["-my:2"], { marginTop: -sizing["2"], marginBottom: -sizing["2"] }],
    [["-my:[3]"], { marginTop: -3, marginBottom: -3 }],
    // ml:
    [["ml:0"], { marginLeft: sizing["0"] }],
    [["ml:2"], { marginLeft: sizing["2"] }],
    [["ml:[3]"], { marginLeft: 3 }],
    // -ml:
    [["-ml:0"], { marginLeft: -sizing["0"] }],
    [["-ml:2"], { marginLeft: -sizing["2"] }],
    [["-ml:[3]"], { marginLeft: -3 }],
    // mr:
    [["mr:0"], { marginRight: sizing["0"] }],
    [["mr:2"], { marginRight: sizing["2"] }],
    [["mr:[3]"], { marginRight: 3 }],
    // -mr:
    [["-mr:0"], { marginRight: -sizing["0"] }],
    [["-mr:2"], { marginRight: -sizing["2"] }],
    [["-mr:[3]"], { marginRight: -3 }],
    // mt:
    [["mt:0"], { marginTop: sizing["0"] }],
    [["mt:2"], { marginTop: sizing["2"] }],
    [["mt:[3]"], { marginTop: 3 }],
    // -mt:
    [["-mt:0"], { marginTop: -sizing["0"] }],
    [["-mt:2"], { marginTop: -sizing["2"] }],
    [["-mt:[3]"], { marginTop: -3 }],
    // mb:
    [["mb:0"], { marginBottom: sizing["0"] }],
    [["mb:2"], { marginBottom: sizing["2"] }],
    [["mb:[3]"], { marginBottom: 3 }],
    // -mb:
    [["-mb:0"], { marginBottom: -sizing["0"] }],
    [["-mb:2"], { marginBottom: -sizing["2"] }],
    [["-mb:[3]"], { marginBottom: -3 }],

    // p:
    [["p:0"], { padding: sizing["0"] }],
    [["p:2"], { padding: sizing["2"] }],
    [["p:[3]"], { padding: 3 }],
    // px:
    [["px:0"], { paddingLeft: sizing["0"], paddingRight: sizing["0"] }],
    [["px:2"], { paddingLeft: sizing["2"], paddingRight: sizing["2"] }],
    [["px:[3]"], { paddingLeft: 3, paddingRight: 3 }],
    // py:
    [["py:0"], { paddingTop: sizing["0"], paddingBottom: sizing["0"] }],
    [["py:2"], { paddingTop: sizing["2"], paddingBottom: sizing["2"] }],
    [["py:[3]"], { paddingTop: 3, paddingBottom: 3 }],
    // pl:
    [["pl:0"], { paddingLeft: sizing["0"] }],
    [["pl:2"], { paddingLeft: sizing["2"] }],
    [["pl:[3]"], { paddingLeft: 3 }],
    // pr:
    [["pr:0"], { paddingRight: sizing["0"] }],
    [["pr:2"], { paddingRight: sizing["2"] }],
    [["pr:[3]"], { paddingRight: 3 }],
    // pt:
    [["pt:0"], { paddingTop: sizing["0"] }],
    [["pt:2"], { paddingTop: sizing["2"] }],
    [["pt:[3]"], { paddingTop: 3 }],
    // pb:
    [["pb:0"], { paddingBottom: sizing["0"] }],
    [["pb:2"], { paddingBottom: sizing["2"] }],
    [["pb:[3]"], { paddingBottom: 3 }],

    // inset:
    [
      ["inset:0"],
      {
        left: sizing["0"],
        right: sizing["0"],
        top: sizing["0"],
        bottom: sizing["0"],
      },
    ],
    [
      ["inset:2"],
      {
        left: sizing["2"],
        right: sizing["2"],
        top: sizing["2"],
        bottom: sizing["2"],
      },
    ],
    [
      ["inset:[3]"],
      {
        left: 3,
        right: 3,
        top: 3,
        bottom: 3,
      },
    ],
    // -inset:
    [
      ["-inset:0"],
      {
        left: -sizing["0"],
        right: -sizing["0"],
        top: -sizing["0"],
        bottom: -sizing["0"],
      },
    ],
    [
      ["-inset:2"],
      {
        left: -sizing["2"],
        right: -sizing["2"],
        top: -sizing["2"],
        bottom: -sizing["2"],
      },
    ],
    [
      ["-inset:[3]"],
      {
        left: -3,
        right: -3,
        top: -3,
        bottom: -3,
      },
    ],
    // inset-x:
    [["inset-x:0"], { left: sizing["0"], right: sizing["0"] }],
    [["inset-x:2"], { left: sizing["2"], right: sizing["2"] }],
    [["inset-x:[3]"], { left: 3, right: 3 }],
    // -inset-x:
    [["-inset-x:0"], { left: -sizing["0"], right: -sizing["0"] }],
    [["-inset-x:2"], { left: -sizing["2"], right: -sizing["2"] }],
    [["-inset-x:[3]"], { left: -3, right: -3 }],
    // inset-y:
    [["inset-y:0"], { top: sizing["0"], bottom: sizing["0"] }],
    [["inset-y:2"], { top: sizing["2"], bottom: sizing["2"] }],
    [["inset-y:[3]"], { top: 3, bottom: 3 }],
    // -inset-y:
    [["-inset-y:0"], { top: -sizing["0"], bottom: -sizing["0"] }],
    [["-inset-y:2"], { top: -sizing["2"], bottom: -sizing["2"] }],
    [["-inset-y:[3]"], { top: -3, bottom: -3 }],
    // left:
    [["left:0"], { left: sizing["0"] }],
    [["left:2"], { left: sizing["2"] }],
    [["left:[3]"], { left: 3 }],
    // -left:
    [["-left:0"], { left: -sizing["0"] }],
    [["-left:2"], { left: -sizing["2"] }],
    [["-left:[3]"], { left: -3 }],
    // right:
    [["right:0"], { right: sizing["0"] }],
    [["right:2"], { right: sizing["2"] }],
    [["right:[3]"], { right: 3 }],
    // -right:
    [["-right:0"], { right: -sizing["0"] }],
    [["-right:2"], { right: -sizing["2"] }],
    [["-right:[3]"], { right: -3 }],
    // top:
    [["top:0"], { top: sizing["0"] }],
    [["top:2"], { top: sizing["2"] }],
    [["top:[3]"], { top: 3 }],
    // -top:
    [["-top:0"], { top: -sizing["0"] }],
    [["-top:2"], { top: -sizing["2"] }],
    [["-top:[3]"], { top: -3 }],
    // bottom:
    [["bottom:0"], { bottom: sizing["0"] }],
    [["bottom:2"], { bottom: sizing["2"] }],
    [["bottom:[3]"], { bottom: 3 }],
    // -bottom:
    [["-bottom:0"], { bottom: -sizing["0"] }],
    [["-bottom:2"], { bottom: -sizing["2"] }],
    [["-bottom:[3]"], { bottom: -3 }],

    // w:
    [["w:0"], { width: sizing["0"] }],
    [["w:2"], { width: sizing["2"] }],
    [["w:[3]"], { width: 3 }],
    // min-w:
    [["min-w:0"], { minWidth: sizing["0"] }],
    [["min-w:2"], { minWidth: sizing["2"] }],
    [["min-w:[3]"], { minWidth: 3 }],
    // max-w:
    [["max-w:0"], { maxWidth: sizing["0"] }],
    [["max-w:2"], { maxWidth: sizing["2"] }],
    [["max-w:[3]"], { maxWidth: 3 }],
    // h:
    [["h:0"], { height: sizing["0"] }],
    [["h:2"], { height: sizing["2"] }],
    [["h:[3]"], { height: 3 }],
    // min-h:
    [["min-h:0"], { minHeight: sizing["0"] }],
    [["min-h:2"], { minHeight: sizing["2"] }],
    [["min-h:[3]"], { minHeight: 3 }],
    // max-h:
    [["max-h:0"], { maxHeight: sizing["0"] }],
    [["max-h:2"], { maxHeight: sizing["2"] }],
    [["max-h:[3]"], { maxHeight: 3 }],
  ];

  test.each(cases)("builder(...%s) returns %s", (classList, expectedOutput) => {
    const builder = makeDefaultBuilder();
    expect(builder(...classList)).toEqual(expectedOutput);
  });

  it("handles m: classes", () => {
    const builder = makeDefaultBuilder();
  });

  // it("handles margin/padding with constraint", () => {
  //   const builder = makeDefaultBuilder();
  //
  //   expect(builder("m:2")).toEqual({ margin: sizing["2"] });
  //   expect(builder("mx:4")).toEqual({
  //     marginLeft: sizing["4"],
  //     marginRight: sizing["4"],
  //   });
  //   expect(builder("mb:2")).toEqual({
  //     marginBottom: sizing["2"],
  //   });
  //
  //   expect(builder("p:2")).toEqual({ padding: sizing["2"] });
  //   expect(builder("px:4")).toEqual({
  //     paddingLeft: sizing["4"],
  //     paddingRight: sizing["4"],
  //   });
  //   expect(builder("pb:2")).toEqual({
  //     paddingBottom: sizing["2"],
  //   });
  // });
  //
  // it("handles margin with override", () => {
  //   const builder = makeDefaultBuilder();
  //
  //   expect(builder("m:[32]")).toEqual({ margin: 32 });
  //   expect(builder("mx:[10%]")).toEqual({
  //     marginLeft: "10%",
  //     marginRight: "10%",
  //   });
  // });
  //
  // it("handles negative margins", () => {
  //   const builder = makeDefaultBuilder();
  //
  //   expect(builder("-m:3").margin).toBe(-sizing["3"]);
  //   expect(builder("-m:[11]").margin).toBe(-11);
  // });
  //
  // it("handles inset/positioning", () => {
  //   const builder = makeDefaultBuilder();
  //   expect(builder("top:2")).toEqual({ top: sizing["2"] });
  // });
  //
  // it("handles background color", () => {
  //   const builder = makeDefaultBuilder();
  //   expect(builder("bg:red-100")).toEqual({
  //     backgroundColor: colors["red-100"],
  //   });
  //   expect(builder("bg:[blue]")).toEqual({ backgroundColor: "blue" });
  // });
  //
  // it("handles tint color", () => {
  //   const builder = makeDefaultBuilder();
  //   expect(builder("tint:red-100")).toEqual({
  //     tintColor: colors["red-100"],
  //   });
  //   expect(builder("tint:[blue]")).toEqual({ tintColor: "blue" });
  // });
  //
  // it("handles background opacity", () => {
  //   const builder = makeDefaultBuilder();
  //   expect(builder("bg:red-100", "bg-opacity:50")).toEqual({
  //     backgroundColor: "rgba(254, 226, 226, 0.5)",
  //   });
  // });
  //
  // it("handles opacity", () => {
  //   const builder = makeDefaultBuilder();
  //   expect(builder("opacity:50")).toEqual({ opacity: 0.5 });
  // });
  //
  // it("handles relative/absolute position", () => {
  //   const builder = makeDefaultBuilder();
  //   expect(builder("relative")).toEqual({ position: "relative" });
  //   expect(builder("absolute")).toEqual({ position: "absolute" });
  // });
  //
  // it("handles hidden", () => {
  //   const builder = makeDefaultBuilder();
  //   expect(builder("hidden")).toEqual({ display: "none" });
  // });
  //
  // it("handles border widths", () => {
  //   const builder = makeDefaultBuilder();
  //   expect(builder("border:2")).toEqual({ borderWidth: borderSizes["2"] });
  // });
  //
  // it("handles border radius", () => {
  //   const builder = makeDefaultBuilder();
  //   expect(builder("rounded:md")).toEqual({ borderRadius: borderRadii["md"] });
  // });
  //
  // it("handles overflow", () => {
  //   const builder = makeDefaultBuilder();
  //   expect(builder("overflow:hidden")).toEqual({ overflow: "hidden" });
  //   expect(builder("overflow:scroll")).toEqual({ overflow: "scroll" });
  // });
  //
  // it("handles justifyContent and alignItems", () => {
  //   const builder = makeDefaultBuilder();
  //   expect(builder("justify:center")).toEqual({ justifyContent: "center" });
  //   expect(builder("items:center")).toEqual({ alignItems: "center" });
  // });
  //
  // it("handles zIndex", () => {
  //   const builder = makeDefaultBuilder();
  //   expect(builder("z:2")).toEqual({ zIndex: 2 });
  // });
  //
  // it("handles constrained font sizes", () => {
  //   const builder = makeDefaultBuilder();
  //   expect(builder("text:sm")).toEqual({
  //     fontSize: fontSizes["sm"][0],
  //     lineHeight: fontSizes["sm"][1],
  //   });
  // });
  //
  // it("handles constrained font weights", () => {
  //   const builder = makeDefaultBuilder();
  //   expect(builder("font-weight:bold")).toEqual({
  //     fontWeight: defaultConstraints.fontWeights["bold"],
  //   });
  // });
  //
  // it("handles italic class", () => {
  //   const builder = makeDefaultBuilder();
  //   expect(builder("italic")).toEqual({
  //     fontStyle: "italic",
  //   });
  // });
  //
  // it("handles text align", () => {
  //   const builder = makeDefaultBuilder();
  //   expect(builder("text-align:center")).toEqual({
  //     textAlign: "center",
  //   });
  // });
  //
  // it("handles text transforms", () => {
  //   const builder = makeDefaultBuilder();
  //
  //   expect(builder("uppercase").textTransform).toBe("uppercase");
  //   expect(builder("lowercase").textTransform).toBe("lowercase");
  //   expect(builder("capitalize").textTransform).toBe("capitalize");
  // });
  //
  // it("handles text decorations", () => {
  //   const builder = makeDefaultBuilder();
  //
  //   expect(builder("underline").textDecorationLine).toBe("underline");
  //   expect(builder("line-through").textDecorationLine).toBe("line-through");
  // });
  //
  // it("handles resizeMode", () => {
  //   const builder = makeDefaultBuilder();
  //
  //   expect(builder("resize:center").resizeMode).toBe("center");
  //   expect(builder("resize:contain").resizeMode).toBe("contain");
  //   expect(builder("resize:cover").resizeMode).toBe("cover");
  //   expect(builder("resize:stretch").resizeMode).toBe("stretch");
  //   expect(builder("resize:repeat").resizeMode).toBe("repeat");
  // });
  //
  // it("handles flex constraints", () => {
  //   const builder = makeDefaultBuilder();
  //   expect(builder("flex:1")).toEqual({
  //     flexGrow: 1,
  //     flexShrink: 1,
  //     flexBasis: "0%",
  //   });
  // });
  //
  // it("handles row:reverse", () => {
  //   const builder = makeDefaultBuilder();
  //   expect(builder("flex:row-reverse")).toEqual({
  //     flexDirection: "row-reverse",
  //   });
  // });
  //
  // it("handles defaultConstraints", () => {
  //   const { builder } = createStyleBuilder(defaultConstraints);
  //   expect(builder("m:2").margin).toBe(defaultConstraints.sizing["2"]);
  // });
  //
  // it("handles shadows", () => {
  //   const builder1 = makeDefaultBuilder();
  //
  //   expect(builder1("shadow:sm")).toEqual({
  //     elevation: defaultConstraints.shadows.sm.android,
  //   });
  //
  //   platform = "ios";
  //   const builder2 = makeDefaultBuilder();
  //   const [
  //     width,
  //     height,
  //     shadowRadius,
  //     shadowOpacity,
  //   ] = defaultConstraints.shadows["sm"].ios;
  //   expect(builder2("shadow:sm")).toEqual({
  //     shadowOffset: { width, height },
  //     shadowOpacity,
  //     shadowRadius,
  //   });
  // });
  //
  // it("handles aspect ratio", () => {
  //   const builder = makeDefaultBuilder();
  //
  //   expect(builder("aspect:1").aspectRatio).toBe(1);
  //   expect(builder("aspect:16-9").aspectRatio).toBeCloseTo(16 / 9);
  //   expect(builder("aspect:3-4").aspectRatio).toBeCloseTo(3 / 4);
  // });
});
