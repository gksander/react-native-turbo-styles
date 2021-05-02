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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStyleBuilder = void 0;
var hexToRgb_1 = require("./hexToRgb");
var cleanMaybeNumberString = function (val) {
    return /^\d+$/.test(val) ? Number(val) : val;
};
/**
 * Style builder
 */
var createStyleBuilder = function (config) {
    var builder = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var styles = {};
        for (var _b = 0, args_1 = args; _b < args_1.length; _b++) {
            var c = args_1[_b];
            var m = c.match(/^(.+)-(.+)$/);
            var prop = m === null || m === void 0 ? void 0 : m[1];
            var value = m === null || m === void 0 ? void 0 : m[2];
            var pertinentCfg = prop ? config === null || config === void 0 ? void 0 : config[prop] : null;
            if (prop && value && pertinentCfg) {
                var partInsideBracket = (_a = value.match(/^\[(.*)\]$/)) === null || _a === void 0 ? void 0 : _a[1];
                var val = (partInsideBracket && cleanMaybeNumberString(partInsideBracket)) ||
                    (pertinentCfg === null || pertinentCfg === void 0 ? void 0 : pertinentCfg[value]);
                if (val !== undefined && val !== null) {
                    if (typeof val === "object") {
                        styles = __assign(__assign({}, styles), val);
                    }
                    else if (Array.isArray(pertinentCfg.__defaultPropertiesToSet)) {
                        for (var _c = 0, _d = pertinentCfg.__defaultPropertiesToSet; _c < _d.length; _c++) {
                            var p = _d[_c];
                            styles[p] = val;
                        }
                    }
                }
            }
        }
        // Massage for bg-opacity
        if (styles["--bg-opacity"] && styles.backgroundColor) {
            var _e = hexToRgb_1.hexToRgb(styles.backgroundColor), r = _e.r, g = _e.g, b = _e.b;
            console.log(r, g, b);
            styles.backgroundColor = "rgba(" + r + ", " + g + ", " + b + ", " + styles["--bg-opacity"] + ")";
        }
        return styles;
    };
    return { builder: builder, config: config };
};
exports.createStyleBuilder = createStyleBuilder;
