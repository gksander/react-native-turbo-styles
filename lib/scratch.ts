import { FlexStyle, TextStyle } from "react-native";

/**
 * Types for createStyleBuilder
 */
type Plug = {
  [key: string]: (...args: any[]) => object;
};
type Prefix<P extends Plug> = keyof P;
type ClassName<P extends Plug, Pf extends keyof P> = ValueOf<
  {
    [K in keyof Pick<P, Pf>]: `${NonSymbol<K>}:${Parameters<P[K]>[0]}`;
  }
>;
type ReturnStyle<P extends Plug, Pf extends keyof P> = UnionToIntersection<
  ValueOf<
    {
      [K in keyof Pick<P, Pf>]: ReturnType<P[K]>;
    }
  >
>;

/**
 * Style builder function (doesn't do anything, but is typed)
 */
const createStyleBuilder = <P extends Plug>(p: P) => {
  return <Ps extends Prefix<P>>(
    ...args: ClassName<P, Ps>[]
  ): ReturnStyle<P, Ps> => {
    return {} as ReturnStyle<P, Ps>;
  };
};

/**
 * Utilities
 */
export type NonSymbol<T> = Exclude<T, symbol>;
export type ValueOf<T> = T[keyof T];
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;
type Override<T extends string | number> = `[${T}]`;

/**
 * Sample implementation!
 */
type SpaceOption = "1" | "2" | "3";

const sb = createStyleBuilder({
  p: ((x) => ({ padding: x })) as (x: SpaceOption) => FlexStyle,
  m: ((x) => ({ margin: x })) as (
    x: SpaceOption | Override<number>
  ) => FlexStyle,
  color: ((color) => ({ color })) as (x: TextStyle["color"]) => TextStyle,
});

// This is typed as FlexStyle & TextStyle. Neat!
const myStyle = sb("p:1", "m:[3]", "color:red");
const _color = myStyle.color;
