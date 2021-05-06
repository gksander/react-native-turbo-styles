import { FlexStyle, ImageStyle, TextStyle, ViewStyle } from "react-native";

export type Constraints = {
  sizing: Record<string | number, string | number>;
  colors: Record<string | number, string>;
  opacities: Record<string | number, number>;
  borderSizes: Record<string | number, number>;
  borderRadii: Record<string | number, number>;
  fontSizes: Record<string | number, readonly [number, number]>;
  fontWeights: Record<string | number, TextStyle["fontWeight"]>;
  shadows: Record<
    string | number,
    { android: number; ios: readonly [number, number, number, number] }
  >;
};

export type NonSymbol<T> = Exclude<T, symbol>;

export type ValueOf<T> = T[keyof T];

/**
 * Declare an override type, since TS doesn't understand string template literals for values of
 *  template literal types. E.g. TS can't make sense of `h-[${3 + 2}]` being of type `h-[${string}]`.
 *  So, you can do `h-[${3 + 2}]` as Override<'h'> as a workaround.
 */
export type ConstraintOverride<T extends string> = `${T}:[${string}]`;

export type sizeInput<C extends Constraints> =
  | NonSymbol<keyof C["sizing"]>
  | `[${string}]`;
export type colorInput<C extends Constraints> =
  | NonSymbol<keyof C["colors"]>
  | `[${string}]`;
export type borderSizeInput<C extends Constraints> =
  | NonSymbol<keyof C["borderSizes"]>
  | `[${string}]`;
export type borderRadiusInput<C extends Constraints> =
  | NonSymbol<keyof C["borderRadii"]>
  | `[${string}]`;

export type SizeHandler<C extends Constraints> = (v: sizeInput<C>) => FlexStyle;

export type ColorHandler<
  C extends Constraints,
  Style extends TextStyle | ImageStyle = TextStyle
> = (v: colorInput<C>) => Style;

type OpacityHandler<C extends Constraints> = (
  v: NonSymbol<keyof C["opacities"]> | `[${number}]`
) => ViewStyle | { "--bg-opacity": number };

export type BorderSizeHandler<C extends Constraints> = (
  v: borderSizeInput<C>
) => ViewStyle;

export type BorderRadiusHandler<C extends Constraints> = (
  v: borderRadiusInput<C>
) => ViewStyle;

export type Config<C extends Constraints> = {
  m: SizeHandler<C>;
  mx: SizeHandler<C>;
  my: SizeHandler<C>;
  ml: SizeHandler<C>;
  mr: SizeHandler<C>;
  mt: SizeHandler<C>;
  mb: SizeHandler<C>;
  p: SizeHandler<C>;
  px: SizeHandler<C>;
  py: SizeHandler<C>;
  pl: SizeHandler<C>;
  pr: SizeHandler<C>;
  pt: SizeHandler<C>;
  pb: SizeHandler<C>;
  inset: SizeHandler<C>;
  "inset-x": SizeHandler<C>;
  "inset-y": SizeHandler<C>;
  left: SizeHandler<C>;
  right: SizeHandler<C>;
  top: SizeHandler<C>;
  bottom: SizeHandler<C>;
  w: SizeHandler<C>;
  "min-w": SizeHandler<C>;
  "max-w": SizeHandler<C>;
  h: SizeHandler<C>;
  "min-h": SizeHandler<C>;
  "max-h": SizeHandler<C>;
  bg: ColorHandler<C>;
  "border-color": ColorHandler<C>;
  color: ColorHandler<C>;
  tint: ColorHandler<C, ImageStyle>;
  "bg-opacity": OpacityHandler<C>;
  opacity: OpacityHandler<C>;
  relative: () => FlexStyle;
  absolute: () => FlexStyle;
  border: BorderSizeHandler<C>;
  "border-t": BorderSizeHandler<C>;
  "border-b": BorderSizeHandler<C>;
  "border-l": BorderSizeHandler<C>;
  "border-r": BorderSizeHandler<C>;
  rounded: BorderRadiusHandler<C>;
  "rounded-t": BorderRadiusHandler<C>;
  "rounded-b": BorderRadiusHandler<C>;
  "rounded-l": BorderRadiusHandler<C>;
  "rounded-r": BorderRadiusHandler<C>;
  overflow: (v: NonNullable<ViewStyle["overflow"]>) => ViewStyle;
  justify: (
    v: "start" | "end" | "center" | "between" | "around" | "evenly"
  ) => FlexStyle;
  items: (v: "start" | "end" | "center" | "baseline" | "stretch") => FlexStyle;
  z: (v: string) => ViewStyle;
  text: (v: NonSymbol<keyof C["fontSizes"]>) => TextStyle;
  "font-weight": (v: NonSymbol<keyof C["fontWeights"]>) => TextStyle;
  italic: () => TextStyle;
  "text-align": (v: NonNullable<TextStyle["textAlign"]>) => TextStyle;
  uppercase: () => TextStyle;
  lowercase: () => TextStyle;
  capitalize: () => TextStyle;
  underline: () => TextStyle;
  "line-through": () => TextStyle;
  // Additional flex helpers
  flex: (
    v:
      | "1"
      | "auto"
      | "initial"
      | "none"
      | "row"
      | "row-reverse"
      | "col"
      | "col-reverse"
      | "grow"
      | "grow-0"
      | "shrink"
      | "shrink-0"
      | "wrap"
      | "wrap-reverse"
      | "nowrap"
  ) => FlexStyle;
  shadow: (v: NonSymbol<keyof C["shadows"]>) => ViewStyle;
  resize: (v: NonNullable<ImageStyle["resizeMode"]>) => ImageStyle;
};

type Style<C extends Constraints, K extends keyof Config<C>> = Parameters<
  Config<C>[K]
>[0] extends undefined
  ? `${NonSymbol<K>}`
  : `${NonSymbol<K>}:${NonSymbol<Parameters<Config<C>[K]>[0]>}`;

export type StyleName<C extends Constraints> = ValueOf<
  {
    [K in keyof Config<C>]: Style<C, K>;
  }
>;
