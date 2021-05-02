"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hexToRgb = void 0;
var hexToRgb = function (hexValue) {
    var _a;
    var h = (_a = hexValue.match(/^#(\w{3,6})$/)) === null || _a === void 0 ? void 0 : _a[1];
    if (!h || !(h.length === 3 || h.length === 6)) {
        throw new Error("Hex value should be 3 or 6 characters long");
    }
    var isShortVal = h.length === 3;
    var reg = isShortVal ? /(\w)/g : /\w{2}/g;
    var matches = h.match(reg);
    if (matches) {
        var _b = matches.map(function (x) {
            return parseInt(isShortVal ? "" + x + x : x, 16);
        }), r = _b[0], g = _b[1], b = _b[2];
        return { r: r, g: g, b: b };
    }
    else {
        throw new Error("Could not parse");
    }
};
exports.hexToRgb = hexToRgb;
