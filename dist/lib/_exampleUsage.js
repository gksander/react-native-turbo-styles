"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.sb = void 0;
var createStyleBuilder_1 = require("./createStyleBuilder");
var react_native_1 = require("react-native");
var spacing = {
    0: 0,
    1: 4,
    1.5: 6,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40,
    "1/4": "25%",
    "1/3": "33.333333%",
    "1/2": "50%",
    "2/3": "66.666666%",
    "3/4": "75%",
    full: "100%",
};
// TODO: Expand these...
var colors = {
    red: "#f00",
    blue: "#00f",
    green: "#0f0",
};
var borderSizes = {
    hairline: react_native_1.StyleSheet.hairlineWidth,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
};
var borderRadii = {
    none: 0,
    sm: 2,
    default: 4,
    md: 6,
    lg: 8,
    xl: 12,
    full: 9999,
};
/**
 * How this thing would actually be used!
 */
exports.sb = (_a = createStyleBuilder_1.createStyleBuilder({
    // Margin
    m: __assign({ __defaultPropertiesToSet: ["margin"] }, spacing),
    mx: __assign({ __defaultPropertiesToSet: ["marginLeft", "marginRight"] }, spacing),
    my: __assign({ __defaultPropertiesToSet: ["marginTop", "marginBottom"] }, spacing),
    ml: __assign({ __defaultPropertiesToSet: ["marginLeft"] }, spacing),
    mr: __assign({ __defaultPropertiesToSet: ["marginRight"] }, spacing),
    mt: __assign({ __defaultPropertiesToSet: ["marginTop"] }, spacing),
    mb: __assign({ __defaultPropertiesToSet: ["marginBottom"] }, spacing),
    // Padding
    p: __assign({ __defaultPropertiesToSet: ["padding"] }, spacing),
    px: __assign({ __defaultPropertiesToSet: ["paddingLeft", "paddingRight"] }, spacing),
    py: __assign({ __defaultPropertiesToSet: ["paddingTop", "paddingBottom"] }, spacing),
    pl: __assign({ __defaultPropertiesToSet: ["paddingLeft"] }, spacing),
    pr: __assign({ __defaultPropertiesToSet: ["paddingRight"] }, spacing),
    pt: __assign({ __defaultPropertiesToSet: ["paddingTop"] }, spacing),
    pb: __assign({ __defaultPropertiesToSet: ["paddingBottom"] }, spacing),
    // Position
    position: {
        __defaultPropertiesToSet: ["position"],
        relative: "relative",
        absolute: "absolute",
    },
    inset: __assign({ __defaultPropertiesToSet: ["top", "bottom", "left", "right"] }, spacing),
    "inset-x": __assign({ __defaultPropertiesToSet: ["left", "right"] }, spacing),
    "inset-y": __assign({ __defaultPropertiesToSet: ["top", "bottom"] }, spacing),
    left: __assign({ __defaultPropertiesToSet: ["left"] }, spacing),
    right: __assign({ __defaultPropertiesToSet: ["right"] }, spacing),
    top: __assign({ __defaultPropertiesToSet: ["top"] }, spacing),
    bottom: __assign({ __defaultPropertiesToSet: ["bottom"] }, spacing),
    // Sizing
    w: __assign({ __defaultPropertiesToSet: ["width"] }, spacing),
    "min-w": __assign({ __defaultPropertiesToSet: ["minWidth"] }, spacing),
    "max-w": __assign({ __defaultPropertiesToSet: ["maxWidth"] }, spacing),
    h: __assign({ __defaultPropertiesToSet: ["height"] }, spacing),
    "min-h": __assign({ __defaultPropertiesToSet: ["minWidth"] }, spacing),
    "max-h": __assign({ __defaultPropertiesToSet: ["maxHeight"] }, spacing),
    bg: __assign({ __defaultPropertiesToSet: ["backgroundColor"] }, colors),
    "bg-opacity": {
        __defaultPropertiesToSet: ["--bg-opacity"],
        0: 0,
        10: 0.1,
        25: 0.25,
        50: 0.5,
        60: 0.6,
        75: 0.75,
        90: 0.9,
        95: 0.95,
        100: 1,
    },
    border: __assign({ __defaultPropertiesToSet: ["borderWidth"] }, borderSizes),
    "border-t": __assign({ __defaultPropertiesToSet: ["borderTopWidth"] }, borderSizes),
    "border-b": __assign({ __defaultPropertiesToSet: ["borderBottomWidth"] }, borderSizes),
    "border-l": __assign({ __defaultPropertiesToSet: ["borderLeftWidth"] }, borderSizes),
    "border-r": __assign({ __defaultPropertiesToSet: ["borderRightWidth"] }, borderSizes),
    "border-color": __assign({ __defaultPropertiesToSet: ["borderColor"] }, colors),
    rounded: __assign({ __defaultPropertiesToSet: ["borderRadius"] }, borderRadii),
    "rounded-t": __assign({ __defaultPropertiesToSet: ["borderTopLeftRadius", "borderTopRightRadius"] }, borderRadii),
    "rounded-b": __assign({ __defaultPropertiesToSet: [
            "borderBottomLeftRadius",
            "borderBottomRightRadius",
        ] }, borderRadii),
    "rounded-l": __assign({ __defaultPropertiesToSet: ["borderBottomLeftRadius", "borderTopLeftRadius"] }, borderRadii),
    "rounded-r": __assign({ __defaultPropertiesToSet: [
            "borderBottomRightRadius",
            "borderTopRightRadius",
        ] }, borderRadii),
    flex: {
        1: { flexGrow: 1, flexShrink: 1, flexBasis: "0%" },
        auto: { flexGrow: 1, flexShrink: 1, flexBasis: "auto" },
        initial: { flexGrow: 0, flexShrink: 1, flexBasis: "auto" },
        none: { flexGrow: 0, flexShrink: 0, flexBasis: "auto" },
        row: { flexDirection: "row" },
        "row-reverse": { flexDirection: "row-reverse" },
        col: { flexDirection: "column" },
        "col-reverse": { flexDirection: "column-reverse" },
        grow: { flexGrow: 1 },
        "grow-0": { flexGrow: 0 },
        shrink: { flexShrink: 1 },
        "shrink-0": { flexShrink: 0 },
        wrap: { flexWrap: "wrap" },
        "wrap-reverse": { flexWrap: "wrap-reverse" },
        nowrap: { flexWrap: "nowrap" },
    },
    justify: {
        __defaultPropertiesToSet: ["justifyContent"],
        start: "flex-start",
        end: "flex-end",
        center: "center",
        between: "space-between",
        around: "space-around",
        evenly: "space-evenly",
    },
    items: {
        __defaultPropertiesToSet: ["alignItems"],
        start: "flex-start",
        end: "flex-end",
        center: "center",
        baseline: "baseline",
        stretch: "stretch",
    },
    // TODO: Typography
    text: {
        "text-xs": {
            fontSize: 12,
            lineHeight: 16,
        },
        "text-sm": {
            fontSize: 14,
            lineHeight: 20,
        },
        "text-base": {
            fontSize: 16,
            lineHeight: 24,
        },
        "text-lg": {
            fontSize: 18,
            lineHeight: 28,
        },
        "text-xl": {
            fontSize: 20,
            lineHeight: 28,
        },
        "text-2xl": {
            fontSize: 24,
            lineHeight: 32,
        },
        "text-3xl": {
            fontSize: 30,
            lineHeight: 36,
        },
        "text-4xl": {
            fontSize: 36,
            lineHeight: 40,
        },
    },
    overflow: {
        __defaultPropertiesToSet: ["overflow"],
        visible: "visible",
        hidden: "hidden",
        scroll: "scroll",
    },
    z: {
        __defaultPropertiesToSet: ["zIndex"],
        0: 0,
        1: 1,
        2: 2,
        3: 3,
        10: 10,
    },
}), _a.builder), exports.config = _a.config;
