"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rgbStringToRgb = void 0;
var RgbRegExp = /rgb\((\d+),\s*(\d+),\s*(\d+)/i;
var isOutOfBounds = function (x) { return isNaN(x) || x < 0; };
var rgbStringToRgb = function (val) {
    var match = val.match(RgbRegExp);
    if (!match) {
        throw new Error("Invalid RGB string, pass something like rgb(100, 200, 255)");
    }
    var _r = match[1], _g = match[2], _b = match[3];
    var _a = [_r, _g, _b].map(function (x) { return parseInt(x, 10); }), r = _a[0], g = _a[1], b = _a[2];
    if (isOutOfBounds(r) || isOutOfBounds(g) || isOutOfBounds(b)) {
        throw new Error("Invalid r, g, or b value");
    }
    return { r: r, g: g, b: b };
};
exports.rgbStringToRgb = rgbStringToRgb;
