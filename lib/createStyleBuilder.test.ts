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
  aspectRatios,
  fontWeights,
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

    // bg:
    [["bg:red-300"], { backgroundColor: colors["red-300"] }],
    [["bg:blue-900"], { backgroundColor: colors["blue-900"] }],
    [["bg:[yellow]"], { backgroundColor: "yellow" }],
    [["bg:[#f03]"], { backgroundColor: "#f03" }],
    // border-color:
    [["border-color:red-300"], { borderColor: colors["red-300"] }],
    [["border-color:blue-900"], { borderColor: colors["blue-900"] }],
    [["border-color:[yellow]"], { borderColor: "yellow" }],
    [["border-color:[#f03]"], { borderColor: "#f03" }],
    // tint:
    [["tint:red-300"], { tintColor: colors["red-300"] }],
    [["tint:blue-900"], { tintColor: colors["blue-900"] }],
    [["tint:[yellow]"], { tintColor: "yellow" }],
    [["tint:[#f03]"], { tintColor: "#f03" }],
    [
      ["bg:red-100", "bg-opacity:50"],
      { backgroundColor: "rgba(254, 226, 226, 0.5)" },
    ],

    // Opacity
    [["opacity:25"], { opacity: 0.25 }],
    [["opacity:[0.33]"], { opacity: 0.33 }],

    // relative/absolute/hidden
    [["relative"], { position: "relative" }],
    [["absolute"], { position: "absolute" }],
    [["hidden"], { display: "none" }],

    // border:
    [["border:hairline"], { borderWidth: borderSizes["hairline"] }],
    [["border-t:hairline"], { borderTopWidth: borderSizes["hairline"] }],
    [["border-b:hairline"], { borderBottomWidth: borderSizes["hairline"] }],
    [["border-l:hairline"], { borderLeftWidth: borderSizes["hairline"] }],
    [["border-r:hairline"], { borderRightWidth: borderSizes["hairline"] }],

    // rounded:
    [["rounded:lg"], { borderRadius: borderRadii["lg"] }],
    [
      ["rounded-t:lg"],
      {
        borderTopLeftRadius: borderRadii["lg"],
        borderTopRightRadius: borderRadii["lg"],
      },
    ],
    [
      ["rounded-b:lg"],
      {
        borderBottomLeftRadius: borderRadii["lg"],
        borderBottomRightRadius: borderRadii["lg"],
      },
    ],
    [
      ["rounded-l:lg"],
      {
        borderTopLeftRadius: borderRadii["lg"],
        borderBottomLeftRadius: borderRadii["lg"],
      },
    ],
    [
      ["rounded-r:lg"],
      {
        borderTopRightRadius: borderRadii["lg"],
        borderBottomRightRadius: borderRadii["lg"],
      },
    ],

    // Overflow
    [["overflow:visible"], { overflow: "visible" }],
    [["overflow:hidden"], { overflow: "hidden" }],
    [["overflow:scroll"], { overflow: "scroll" }],

    // z:
    [["z:0"], { zIndex: 0 }],
    [["z:1"], { zIndex: 1 }],
    [["z:10"], { zIndex: 10 }],

    // justify:
    [["justify:start"], { justifyContent: "flex-start" }],
    [["justify:end"], { justifyContent: "flex-end" }],
    [["justify:center"], { justifyContent: "center" }],
    [["justify:between"], { justifyContent: "space-between" }],
    [["justify:around"], { justifyContent: "space-around" }],
    [["justify:evenly"], { justifyContent: "space-evenly" }],

    // items:
    [["items:start"], { alignItems: "flex-start" }],
    [["items:end"], { alignItems: "flex-end" }],
    [["items:center"], { alignItems: "center" }],
    [["items:baseline"], { alignItems: "baseline" }],
    [["items:stretch"], { alignItems: "stretch" }],

    // flex helpers
    [["flex:1"], { flexGrow: 1, flexShrink: 1, flexBasis: "0%" }],
    [["flex:auto"], { flexGrow: 1, flexShrink: 1, flexBasis: "auto" }],
    [["flex:initial"], { flexGrow: 0, flexShrink: 1, flexBasis: "auto" }],
    [["flex:none"], { flexGrow: 0, flexShrink: 0, flexBasis: "auto" }],
    [["flex:row"], { flexDirection: "row" }],
    [["flex:row-reverse"], { flexDirection: "row-reverse" }],
    [["flex:col"], { flexDirection: "column" }],
    [["flex:col-reverse"], { flexDirection: "column-reverse" }],
    [["flex:grow"], { flexGrow: 1 }],
    [["flex:grow-0"], { flexGrow: 0 }],
    [["flex:shrink"], { flexShrink: 1 }],
    [["flex:shrink-0"], { flexShrink: 0 }],
    [["flex:wrap"], { flexWrap: "wrap" }],
    [["flex:wrap-reverse"], { flexWrap: "wrap-reverse" }],
    [["flex:nowrap"], { flexWrap: "nowrap" }],

    // text:
    [
      ["text:sm"],
      { fontSize: fontSizes["sm"][0], lineHeight: fontSizes["sm"][1] },
    ],
    [
      ["text:2xl"],
      { fontSize: fontSizes["2xl"][0], lineHeight: fontSizes["2xl"][1] },
    ],

    // font-weight:
    [["font-weight:light"], { fontWeight: fontWeights["light"] }],
    [["font-weight:bold"], { fontWeight: fontWeights["bold"] }],
    [["font-weight:extrabold"], { fontWeight: fontWeights["extrabold"] }],

    // text-align:
    [["text-align:center"], { textAlign: "center" }],

    // text transform/decorations
    [["italic"], { fontStyle: "italic" }],
    [["uppercase"], { textTransform: "uppercase" }],
    [["lowercase"], { textTransform: "lowercase" }],
    [["capitalize"], { textTransform: "capitalize" }],
    [["underline"], { textDecorationLine: "underline" }],
    [["line-through"], { textDecorationLine: "line-through" }],

    // resize:
    [["resize:cover"], { resizeMode: "cover" }],
    [["resize:contain"], { resizeMode: "contain" }],
    [["resize:stretch"], { resizeMode: "stretch" }],
    [["resize:repeat"], { resizeMode: "repeat" }],
    [["resize:center"], { resizeMode: "center" }],

    // aspect:
    [
      ["aspect:1"],
      { aspectRatio: aspectRatios["1"][0] / aspectRatios["1"][1] },
    ],
    [
      ["aspect:16-9"],
      { aspectRatio: aspectRatios["16-9"][0] / aspectRatios["16-9"][1] },
    ],
    [
      ["aspect:3-4"],
      { aspectRatio: aspectRatios["3-4"][0] / aspectRatios["3-4"][1] },
    ],
  ];

  test.each(cases)("builder(...%s) returns %s", (classList, expectedOutput) => {
    const builder = makeDefaultBuilder();
    expect(builder(...classList)).toEqual(expectedOutput);
  });

  it("handles shadows", () => {
    const builder1 = makeDefaultBuilder();

    expect(builder1("shadow:sm")).toEqual({
      elevation: defaultConstraints.shadows.sm.android,
    });

    platform = "ios";
    const builder2 = makeDefaultBuilder();
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
