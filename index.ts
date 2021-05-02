import { ViewStyle } from "react-native";

/**
 * Plugin:
 *  - takes in config object?
 *    - property
 *    - prefix
 *  - returns transformer
 *
 * Builder:
 *  - takes a list of plugins
 *  - returns main transformer
 */

type StringLiteral<T> = T extends `${string & T}` ? T : never;

type StyleTransformer<T> = (c: T) => Record<string, any> | null;

const marginPlugin = <
  Prefix extends string,
  C extends {
    properties: (keyof ViewStyle)[];
    prefix: StringLiteral<Prefix>;
    options: Record<string, any>;
  }
>(
  config: C
): StyleTransformer<`${C["prefix"]}-${(string | number) &
  keyof C["options"]}`> => {
  const r = new RegExp(`^${config.prefix}-(.+)`);

  return (c) => {
    const matchedPart = c.match(r)?.[1];

    if (matchedPart) {
      return {
        m: matchedPart,
      };
    }
    return null;
  };
};

const myPlug = marginPlugin({
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
