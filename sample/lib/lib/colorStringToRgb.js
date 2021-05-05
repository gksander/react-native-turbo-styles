"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.colorStringToRgb = void 0;
var rgbStringToRgb_1 = require("./rgbStringToRgb");
var hexToRgb_1 = require("./hexToRgb");
var RgbRegExp = /rgb\(/;
var colorStringToRgb = function (val) {
    if (RgbRegExp.test(val)) {
        return rgbStringToRgb_1.rgbStringToRgb(val);
    }
    else {
        return hexToRgb_1.hexToRgb(val);
    }
};
exports.colorStringToRgb = colorStringToRgb;
