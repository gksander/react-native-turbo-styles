import { FlexStyle, ImageStyle, TextStyle, ViewStyle } from "react-native";

/**
 * Shape of constraints
 */
export type Constraints = {
  sizing?: Record<string | number, string | number>;
  colors?: Record<string | number, string>;
  opacities?: Record<string | number, number>;
  borderSizes?: Record<string | number, number>;
  borderRadii?: Record<string | number, number>;
  fontSizes?: Record<string | number, readonly [number, number]>;
  fontWeights?: Record<string | number, TextStyle["fontWeight"]>;
  shadows?: Record<
    string | number,
    { android: number; ios: readonly [number, number, number, number] }
  >;
  aspectRatios?: Record<string | number, readonly [number, number]>;
};

/**
 * The shape of our configuration. Includes all of our helpers.
 */
export type Config<C extends Constraints> = {
  m: SizeHandler<C>;
  "-m": SizeHandler<C>;
  mx: SizeHandler<C>;
  "-mx": SizeHandler<C>;
  my: SizeHandler<C>;
  "-my": SizeHandler<C>;
  ml: SizeHandler<C>;
  "-ml": SizeHandler<C>;
  mr: SizeHandler<C>;
  "-mr": SizeHandler<C>;
  mt: SizeHandler<C>;
  "-mt": SizeHandler<C>;
  mb: SizeHandler<C>;
  "-mb": SizeHandler<C>;
  p: SizeHandler<C>;
  px: SizeHandler<C>;
  py: SizeHandler<C>;
  pl: SizeHandler<C>;
  pr: SizeHandler<C>;
  pt: SizeHandler<C>;
  pb: SizeHandler<C>;
  inset: SizeHandler<C>;
  "-inset": SizeHandler<C>;
  "inset-x": SizeHandler<C>;
  "-inset-x": SizeHandler<C>;
  "inset-y": SizeHandler<C>;
  "-inset-y": SizeHandler<C>;
  left: SizeHandler<C>;
  "-left": SizeHandler<C>;
  right: SizeHandler<C>;
  "-right": SizeHandler<C>;
  top: SizeHandler<C>;
  "-top": SizeHandler<C>;
  bottom: SizeHandler<C>;
  "-bottom": SizeHandler<C>;
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
  hidden: () => FlexStyle;
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
  text: (
    v: IfDefined<C["fontSizes"], NonSymbol<keyof C["fontSizes"]>>
  ) => TextStyle;
  "font-weight": (
    v: IfDefined<C["fontWeights"], NonSymbol<keyof C["fontWeights"]>>
  ) => TextStyle;
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
  shadow: (
    v: IfDefined<C["shadows"], NonSymbol<keyof C["shadows"]>>
  ) => ViewStyle;
  resize: (v: NonNullable<ImageStyle["resizeMode"]>) => ImageStyle;
  aspect: (
    v:
      | IfDefined<C["aspectRatios"], NonSymbol<keyof C["aspectRatios"]>>
      | `[${string}]`
  ) => FlexStyle;
};

type Style<
  C extends Constraints,
  K extends keyof Config<C>,
  FP = Parameters<Config<C>[K]>[0]
> = FP extends undefined
  ? `${NonSymbol<K>}`
  : `${NonSymbol<K>}:${NonSymbol<Parameters<Config<C>[K]>[0]>}`;

export type ClassName<C extends Constraints> = ValueOf<
  {
    [K in keyof Config<C>]: Style<C, K>;
  }
>;

/**
 * Configuration helpers
 */
export type sizeInput<C extends Constraints> =
  | IfDefined<C["sizing"], NonSymbol<keyof C["sizing"]>>
  | `[${string}]`;
export type colorInput<C extends Constraints> =
  | IfDefined<C["colors"], NonSymbol<keyof C["colors"]>>
  | `[${string}]`;
export type borderSizeInput<C extends Constraints> =
  | IfDefined<C["borderSizes"], NonSymbol<keyof C["borderSizes"]>>
  | `[${string}]`;
export type borderRadiusInput<C extends Constraints> =
  | IfDefined<C["borderRadii"], NonSymbol<keyof C["borderRadii"]>>
  | `[${string}]`;

export type SizeHandler<C extends Constraints> = (v: sizeInput<C>) => FlexStyle;

export type ColorHandler<
  C extends Constraints,
  Style extends TextStyle | ImageStyle = TextStyle
> = (v: colorInput<C>) => Style;

type OpacityHandler<C extends Constraints> = (
  v: IfDefined<C["opacities"], NonSymbol<keyof C["opacities"]>> | `[${number}]`
) => ViewStyle | { "--bg-opacity"?: number };

export type BorderSizeHandler<C extends Constraints> = (
  v: borderSizeInput<C>
) => ViewStyle;

export type BorderRadiusHandler<C extends Constraints> = (
  v: borderRadiusInput<C>
) => ViewStyle;

/**
 * Utilities
 */
export type NonSymbol<T> = Exclude<T, symbol>;
export type ValueOf<T> = T[keyof T];
type IfDefined<Condition, Value> = Condition extends undefined ? never : Value;

/**
 * Declare an override type, since TS doesn't understand string template literals for values of
 *  template literal types. E.g. TS can't make sense of `h-[${3 + 2}]` being of type `h-[${string}]`.
 *  So, you can do `h-[${3 + 2}]` as Override<'h'> as a workaround.
 */
export type ConstraintOverride<T extends string> = `${T}:[${string}]`;

type Foo = undefined extends never ? true : false;
