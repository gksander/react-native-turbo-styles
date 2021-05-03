import { FlexStyle, TextStyle, ViewStyle } from "react-native";
import { colorStringToRgb } from "./colorStringToRgb";

type Constraints = {
  sizing: Record<string | number, string | number>;
  colors: Record<string | number, string>;
  bgOpacities: Record<string | number, number>;
  borderSizes: Record<string | number, number>;
};

type NonSymbol<T> = Exclude<T, symbol>;
type ValueOf<T> = T[keyof T];

/**
 * Create style builder. Pass in constraints, create handler
 */
export const createStyleBuilder = <C extends Constraints>(constraints: C) => {
  type sizeInput = NonSymbol<keyof C["sizing"]> | `[${string}]`;
  const getSizeValue = (val: sizeInput): string | number | undefined => {
    return constraints.sizing[val] ?? extractFromBrackets(val);
  };
  const sizeHandler = (...properties: Array<keyof FlexStyle>) => (
    key: sizeInput
  ) => {
    const val = getSizeValue(key);
    // S TODO: Improve this?
    return properties.reduce<FlexStyle>((acc, prop) => {
      // @ts-ignore
      acc[prop] = val;
      return acc;
    }, {});
  };

  type colorInput = NonSymbol<keyof C["colors"]> | `[${string}]`;
  const getColorValue = (val: colorInput): string | undefined => {
    return constraints.colors[val] ?? extractFromBrackets(val);
  };
  const colorHandler = (...properties: Array<keyof TextStyle>) => (
    inp: colorInput
  ) => {
    const val = getColorValue(inp);
    // S TODO: Improve this?
    return properties.reduce<TextStyle>((acc, prop) => {
      // @ts-ignore
      acc[prop] = val;
      return acc;
    }, {});
  };

  // Border sizing
  type borderSizeInput = NonSymbol<keyof C["borderSizes"]> | `[${string}]`;
  const getBorderSizeValue = (
    val: borderSizeInput
  ): string | number | undefined => {
    return constraints.borderSizes[val] ?? extractFromBrackets(val);
  };
  const borderSizeHandler = (...properties: Array<keyof ViewStyle>) => (
    inp: borderSizeInput
  ) => {
    const val = getBorderSizeValue(inp);
    // S TODO: Improve this?
    return properties.reduce<ViewStyle>((acc, prop) => {
      // @ts-ignore
      acc[prop] = val;
      return acc;
    }, {});
  };

  const config = {
    // Margin
    m: sizeHandler("margin"),
    mx: sizeHandler("marginLeft", "marginRight"),
    my: sizeHandler("marginTop", "marginBottom"),
    ml: sizeHandler("marginLeft"),
    mr: sizeHandler("marginRight"),
    mt: sizeHandler("marginTop"),
    mb: sizeHandler("marginBottom"),
    // Padding
    p: sizeHandler("padding"),
    px: sizeHandler("paddingLeft", "paddingRight"),
    py: sizeHandler("paddingTop", "paddingBottom"),
    pl: sizeHandler("paddingLeft"),
    pr: sizeHandler("paddingRight"),
    pt: sizeHandler("paddingTop"),
    pb: sizeHandler("paddingBottom"),
    // Inset/position
    inset: sizeHandler("top", "bottom", "left", "right"),
    "inset-x": sizeHandler("left", "right"),
    "inset-y": sizeHandler("top", "bottom"),
    left: sizeHandler("left"),
    right: sizeHandler("right"),
    top: sizeHandler("top"),
    bottom: sizeHandler("bottom"),
    // Sizing
    w: sizeHandler("width"),
    "min-w": sizeHandler("minWidth"),
    "max-w": sizeHandler("maxWidth"),
    h: sizeHandler("height"),
    "min-h": sizeHandler("minHeight"),
    "max-h": sizeHandler("maxHeight"),
    // Colors
    bg: colorHandler("backgroundColor"),
    "border-color": colorHandler("borderColor"),
    // Background opacity
    "bg-opacity": (inp: NonSymbol<keyof C["bgOpacities"]> | `[${number}]`) => {
      const val = constraints.bgOpacities[inp] ?? extractFromBrackets(inp);
      return { "--bg-opacity": val };
    },
    relative: () => <FlexStyle>{ position: "relative" },
    absolute: () => <FlexStyle>{ position: "absolute" },
    // Border sizing
    border: borderSizeHandler("borderWidth"),
    "border-t": borderSizeHandler("borderTopWidth"),
    "border-b": borderSizeHandler("borderBottomWidth"),
    "border-l": borderSizeHandler("borderLeftWidth"),
    "border-r": borderSizeHandler("borderRightWidth"),
    // Overflow
    overflow: (overflow: NonNullable<ViewStyle["overflow"]>) =>
      <ViewStyle>{
        overflow,
      },
  } as const;

  /**
   * Our actual builder. Takes an array of "class names" that
   * 	are constructed from our config
   */
  const builder = (
    ...args: Array<
      ValueOf<
        {
          [k in keyof typeof config]: Parameters<
            typeof config[k]
          >[0] extends undefined
            ? `${NonSymbol<k>}`
            : `${NonSymbol<k>}-${NonSymbol<Parameters<typeof config[k]>[0]>}`;
        }
      >
    >
  ) => {
    let styles = {} as Record<string | number, any>;

    for (let c of args) {
      const m = c.match(/^(.+)-(.+)$/);
      const prop = m?.[1];
      const value = m?.[2];

      if (prop && value) {
        const handler = config?.[prop as NonSymbol<keyof typeof config>];
        // @ts-ignore
        styles = { ...styles, ...handler(value) };
      } else {
        // @ts-ignore
        styles = { ...styles, ...(config?.[c]() || {}) };
      }
    }

    // Massage for bg-opacity
    if (styles["--bg-opacity"] && styles.backgroundColor) {
      const { r, g, b } = colorStringToRgb(styles.backgroundColor);
      styles.backgroundColor = `rgba(${r}, ${g}, ${b}, ${styles["--bg-opacity"]})`;
      delete styles["--bg-opacity"];
    }

    return styles;
  };

  return { builder };
};

/**
 * If string looks like number, make it number
 */
const cleanMaybeNumberString = (val: string): string | number =>
  /^\d+$/.test(val) ? Number(val) : val;

/**
 * Extract value from brackets, e.g. [32] -> 32
 */
const extractFromBrackets = (
  val: string | number
): string | number | undefined => {
  const insideBracket = (typeof val === "string" ? val : String(val)).match(
    /^\[(.*)\]$/
  )?.[1];
  if (insideBracket) {
    return cleanMaybeNumberString(insideBracket);
  } else {
    return undefined;
  }
};
