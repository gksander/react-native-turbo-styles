export type Constraints = {
  sizing: Record<string | number, string | number>;
  colors: Record<string | number, string>;
  opacities: Record<string | number, number>;
  borderSizes: Record<string | number, number>;
  borderRadii: Record<string | number, number>;
  fontSizes: Record<string | number, readonly [number, number]>;
};

export type NonSymbol<T> = Exclude<T, symbol>;

export type ValueOf<T> = T[keyof T];

/**
 * Declare an override type, since TS doesn't understand string template literals for values of
 *  template literal types. E.g. TS can't make sense of `h-[${3 + 2}]` being of type `h-[${string}]`.
 *  So, you can do `h-[${3 + 2}]` as Override<'h'> as a workaround.
 */
export type ConstraintOverride<T extends string> = `${T}-[${string}]`;
