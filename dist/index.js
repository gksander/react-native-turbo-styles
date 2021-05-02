"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var marginPlugin = function (config) {
    var r = new RegExp("^" + config.prefix + "-(.+)");
    return function (c) {
        var _a;
        var matchedPart = (_a = c.match(r)) === null || _a === void 0 ? void 0 : _a[1];
        if (matchedPart) {
            return {
                m: matchedPart,
            };
        }
        return null;
    };
};
var myPlug = marginPlugin({
    prefix: "m",
    properties: ["margin"],
    options: { foo: 3, bar: 5 },
});
console.log(myPlug("m-foo"));
/**
 * ASDF
 */
// marginPlugin({ prefix: "m-", property: "margin", options: { foo: 3 } })(
//   "m-foo"
// );
// const createBuilder = <Spacing extends Record<string | number, any>>(theme: {
//   spacing: Spacing;
// }) => {
//   return (c: `m-${(string | number) & keyof Spacing}`) => c;
// };
//
// const myBuilder = createBuilder({
//   spacing: {
//     1: 3,
//     2: 6,
//   },
// });
//
// console.log(myBuilder("m-2"));
