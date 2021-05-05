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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStyleBuilder = void 0;
var React = __importStar(require("react"));
var react_native_1 = require("react-native");
var colorStringToRgb_1 = require("./colorStringToRgb");
/**
 * Create style builder. Pass in constraints, create handler
 */
var createStyleBuilder = function (constraints) {
    var __cachedStyles = {};
    var getSizeValue = function (val) {
        var _a;
        return (_a = constraints.sizing[val]) !== null && _a !== void 0 ? _a : extractFromBrackets(val);
    };
    var sizeHandler = function () {
        var properties = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            properties[_i] = arguments[_i];
        }
        return function (key) {
            var val = getSizeValue(key);
            return properties.reduce(function (acc, prop) {
                // @ts-ignore
                acc[prop] = val;
                return acc;
            }, {});
        };
    };
    var getColorValue = function (val) {
        var _a;
        return (_a = constraints.colors[val]) !== null && _a !== void 0 ? _a : extractFromBrackets(val);
    };
    var colorHandler = function () {
        var properties = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            properties[_i] = arguments[_i];
        }
        return function (inp) {
            var val = getColorValue(inp);
            return properties.reduce(function (acc, prop) {
                // @ts-ignore
                acc[prop] = val;
                return acc;
            }, {});
        };
    };
    // Border sizing
    var getBorderSizeValue = function (val) {
        var _a;
        return (_a = constraints.borderSizes[val]) !== null && _a !== void 0 ? _a : extractFromBrackets(val);
    };
    var borderSizeHandler = function () {
        var properties = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            properties[_i] = arguments[_i];
        }
        return function (inp) {
            var val = getBorderSizeValue(inp);
            return properties.reduce(function (acc, prop) {
                // @ts-ignore
                acc[prop] = val;
                return acc;
            }, {});
        };
    };
    // Border radii
    var getBorderRadiusValue = function (val) {
        var _a;
        return (_a = constraints.borderRadii[val]) !== null && _a !== void 0 ? _a : extractFromBrackets(val);
    };
    var borderRadiusHandler = function () {
        var properties = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            properties[_i] = arguments[_i];
        }
        return function (inp) {
            var val = getBorderRadiusValue(inp);
            return properties.reduce(function (acc, prop) {
                // @ts-ignore
                acc[prop] = val;
                return acc;
            }, {});
        };
    };
    var config = {
        // Margin
        m: sizeHandler("margin"),
        mx: sizeHandler("marginLeft", "marginRight"),
        my: sizeHandler("marginTop", "marginBottom"),
        ml: sizeHandler("marginLeft"),
        mr: sizeHandler("marginRight"),
        mt: sizeHandler("marginTop"),
        mb: sizeHandler("marginBottom"),
        // Padding
        p: sizeHandler("padding"),
        px: sizeHandler("paddingLeft", "paddingRight"),
        py: sizeHandler("paddingTop", "paddingBottom"),
        pl: sizeHandler("paddingLeft"),
        pr: sizeHandler("paddingRight"),
        pt: sizeHandler("paddingTop"),
        pb: sizeHandler("paddingBottom"),
        // Inset/position
        inset: sizeHandler("top", "bottom", "left", "right"),
        "inset-x": sizeHandler("left", "right"),
        "inset-y": sizeHandler("top", "bottom"),
        left: sizeHandler("left"),
        right: sizeHandler("right"),
        top: sizeHandler("top"),
        bottom: sizeHandler("bottom"),
        // Sizing
        w: sizeHandler("width"),
        "min-w": sizeHandler("minWidth"),
        "max-w": sizeHandler("maxWidth"),
        h: sizeHandler("height"),
        "min-h": sizeHandler("minHeight"),
        "max-h": sizeHandler("maxHeight"),
        // Colors
        bg: colorHandler("backgroundColor"),
        "border-color": colorHandler("borderColor"),
        color: colorHandler("color"),
        // Background opacity
        "bg-opacity": function (inp) {
            var _a;
            var val = (_a = constraints.opacities[inp]) !== null && _a !== void 0 ? _a : extractFromBrackets(inp);
            return { "--bg-opacity": val };
        },
        opacity: function (inp) {
            var _a;
            var val = (_a = constraints.opacities[inp]) !== null && _a !== void 0 ? _a : extractFromBrackets(inp);
            return { opacity: val };
        },
        relative: function () { return ({ position: "relative" }); },
        absolute: function () { return ({ position: "absolute" }); },
        // Border sizing
        border: borderSizeHandler("borderWidth"),
        "border-t": borderSizeHandler("borderTopWidth"),
        "border-b": borderSizeHandler("borderBottomWidth"),
        "border-l": borderSizeHandler("borderLeftWidth"),
        "border-r": borderSizeHandler("borderRightWidth"),
        // Border radius
        rounded: borderRadiusHandler("borderRadius"),
        "rounded-t": borderRadiusHandler("borderTopLeftRadius", "borderTopRightRadius"),
        "rounded-b": borderRadiusHandler("borderBottomLeftRadius", "borderBottomRightRadius"),
        "rounded-l": borderRadiusHandler("borderBottomLeftRadius", "borderTopLeftRadius"),
        "rounded-r": borderRadiusHandler("borderTopRightRadius", "borderBottomRightRadius"),
        // Overflow
        overflow: function (overflow) { return ({
            overflow: overflow,
        }); },
        justify: function (inp) {
            return {
                justifyContent: {
                    start: "flex-start",
                    end: "flex-end",
                    center: "center",
                    between: "space-between",
                    around: "space-around",
                    evenly: "space-evenly",
                }[inp],
            };
        },
        items: function (inp) {
            return {
                alignItems: {
                    start: "flex-start",
                    end: "flex-end",
                    center: "center",
                    baseline: "baseline",
                    stretch: "stretch",
                }[inp],
            };
        },
        z: function (inp) { return ({ zIndex: parseInt(inp) }); },
        text: function (inp) {
            var _a = constraints.fontSizes[inp], fontSize = _a[0], lineHeight = _a[1];
            return { fontSize: fontSize, lineHeight: lineHeight };
        },
        flex: function (inp) {
            return {
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
            }[inp];
        },
        shadow: function (inp) {
            var _a, _b, _c, _d;
            var val = constraints.shadows[inp];
            return react_native_1.Platform.select({
                android: { elevation: (val === null || val === void 0 ? void 0 : val.android) || 0 },
                default: {
                    shadowOffset: {
                        width: ((_a = val === null || val === void 0 ? void 0 : val.ios) === null || _a === void 0 ? void 0 : _a[0]) || 0,
                        height: ((_b = val === null || val === void 0 ? void 0 : val.ios) === null || _b === void 0 ? void 0 : _b[1]) || 0,
                    },
                    shadowRadius: ((_c = val === null || val === void 0 ? void 0 : val.ios) === null || _c === void 0 ? void 0 : _c[2]) || 0,
                    shadowOpacity: ((_d = val === null || val === void 0 ? void 0 : val.ios) === null || _d === void 0 ? void 0 : _d[3]) || 0,
                },
            });
        },
    };
    /**
     * Our actual builder. Takes an array of "class names" that
     * 	are constructed from our config
     */
    var builder = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var key = args.join(",");
        // Return from cache if possible.
        if (__cachedStyles[key]) {
            return __cachedStyles[key];
        }
        var styles = {};
        for (var _b = 0, args_1 = args; _b < args_1.length; _b++) {
            var c = args_1[_b];
            var m = c.match(/^(.+):(.+)$/);
            var prop = m === null || m === void 0 ? void 0 : m[1];
            var value = m === null || m === void 0 ? void 0 : m[2];
            var handler = config === null || config === void 0 ? void 0 : config[prop];
            if (prop && value && handler) {
                // @ts-ignore
                styles = __assign(__assign({}, styles), handler(value));
            }
            else {
                // @ts-ignore
                styles = __assign(__assign({}, styles), (((_a = config === null || config === void 0 ? void 0 : config[c]) === null || _a === void 0 ? void 0 : _a.call(config)) || {}));
            }
        }
        // Massage for bg-opacity
        if (styles["--bg-opacity"] && styles.backgroundColor) {
            var _c = colorStringToRgb_1.colorStringToRgb(styles.backgroundColor), r = _c.r, g = _c.g, b = _c.b;
            styles.backgroundColor = "rgba(" + r + ", " + g + ", " + b + ", " + styles["--bg-opacity"] + ")";
            delete styles["--bg-opacity"];
        }
        // Store style in cache
        __cachedStyles[key] = styles;
        return styles;
    };
    var useTurboStyles = function () { return builder; };
    var useTurboStylesWithDarkMode = function () {
        var colorScheme = react_native_1.useColorScheme();
        return React.useCallback(function (_a) {
            var base = _a.base, dark = _a.dark;
            return Object.assign(builder.apply(void 0, base), colorScheme === "dark" ? builder.apply(void 0, dark) : {});
        }, [colorScheme]);
    };
    return { builder: builder, useTurboStyles: useTurboStyles, useTurboStylesWithDarkMode: useTurboStylesWithDarkMode, constraints: constraints };
};
exports.createStyleBuilder = createStyleBuilder;
/**
 * If string looks like number, make it number
 */
var cleanMaybeNumberString = function (val) {
    return /^\d+$/.test(val) ? Number(val) : val;
};
/**
 * Extract value from brackets, e.g. [32] -> 32
 */
var extractFromBrackets = function (val) {
    var _a;
    var insideBracket = (_a = (typeof val === "string" ? val : String(val)).match(/^\[(.*)\]$/)) === null || _a === void 0 ? void 0 : _a[1];
    if (insideBracket) {
        return cleanMaybeNumberString(insideBracket);
    }
    else {
        return undefined;
    }
};
