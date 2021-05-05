import * as React from "react";
import {
  FlexStyle,
  Platform,
  TextStyle,
  useColorScheme,
  ViewStyle,
} from "react-native";
import { colorStringToRgb } from "./colorStringToRgb";
import {
  BorderRadiusHandler,
  borderRadiusInput,
  BorderSizeHandler,
  borderSizeInput,
  ColorHandler,
  colorInput,
  Config,
  Constraints,
  NonSymbol,
  SizeHandler,
  sizeInput,
  StyleName,
} from "./utilTypes";

/**
 * Create style builder. Pass in constraints, create handler
 */
export const createStyleBuilder = <C extends Constraints>(constraints: C) => {
  const __cachedStyles = {} as Record<string, Record<string, any>>;

  const getSizeValue = (val: sizeInput<C>): string | number | undefined => {
    return constraints.sizing[val] ?? extractFromBrackets(val);
  };
  const sizeHandler = (
    ...properties: Array<keyof FlexStyle>
  ): SizeHandler<C> => (key: sizeInput<C>) => {
    const val = getSizeValue(key);
    return properties.reduce<FlexStyle>((acc, prop) => {
      // @ts-ignore
      acc[prop] = val;
      return acc;
    }, {});
  };

  const getColorValue = (val: colorInput<C>): string | undefined => {
    return constraints.colors[val] ?? extractFromBrackets(val);
  };
  const colorHandler = (
    ...properties: Array<keyof TextStyle>
  ): ColorHandler<C> => (inp) => {
    const val = getColorValue(inp);
    return properties.reduce<TextStyle>((acc, prop) => {
      // @ts-ignore
      acc[prop] = val;
      return acc;
    }, {});
  };

  // Border sizing
  const getBorderSizeValue = (
    val: borderSizeInput<C>
  ): string | number | undefined => {
    return constraints.borderSizes[val] ?? extractFromBrackets(val);
  };
  const borderSizeHandler = (
    ...properties: Array<keyof ViewStyle>
  ): BorderSizeHandler<C> => (inp) => {
    const val = getBorderSizeValue(inp);
    return properties.reduce<ViewStyle>((acc, prop) => {
      // @ts-ignore
      acc[prop] = val;
      return acc;
    }, {});
  };

  // Border radii

  const getBorderRadiusValue = (
    val: borderRadiusInput<C>
  ): string | number | undefined => {
    return constraints.borderRadii[val] ?? extractFromBrackets(val);
  };
  const borderRadiusHandler = (
    ...properties: Array<keyof ViewStyle>
  ): BorderRadiusHandler<C> => (inp) => {
    const val = getBorderRadiusValue(inp);
    return properties.reduce<ViewStyle>((acc, prop) => {
      // @ts-ignore
      acc[prop] = val;
      return acc;
    }, {});
  };

  const config: Config<C> = {
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
    color: colorHandler("color"),
    // Background opacity
    "bg-opacity": (inp: NonSymbol<keyof C["opacities"]> | `[${number}]`) => {
      const val = constraints.opacities[inp] ?? extractFromBrackets(inp);
      return { "--bg-opacity": val };
    },
    opacity: (inp: NonSymbol<keyof C["opacities"]> | `[${number}]`) => {
      const val = constraints.opacities[inp] ?? extractFromBrackets(inp);
      return <ViewStyle>{ opacity: val };
    },
    relative: () => <FlexStyle>{ position: "relative" },
    absolute: () => <FlexStyle>{ position: "absolute" },
    // Border sizing
    border: borderSizeHandler("borderWidth"),
    "border-t": borderSizeHandler("borderTopWidth"),
    "border-b": borderSizeHandler("borderBottomWidth"),
    "border-l": borderSizeHandler("borderLeftWidth"),
    "border-r": borderSizeHandler("borderRightWidth"),
    // Border radius
    rounded: borderRadiusHandler("borderRadius"),
    "rounded-t": borderRadiusHandler(
      "borderTopLeftRadius",
      "borderTopRightRadius"
    ),
    "rounded-b": borderRadiusHandler(
      "borderBottomLeftRadius",
      "borderBottomRightRadius"
    ),
    "rounded-l": borderRadiusHandler(
      "borderBottomLeftRadius",
      "borderTopLeftRadius"
    ),
    "rounded-r": borderRadiusHandler(
      "borderTopRightRadius",
      "borderBottomRightRadius"
    ),
    // Overflow
    overflow: (overflow) => ({
      overflow,
    }),
    justify: (inp) => {
      return {
        justifyContent: {
          start: "flex-start",
          end: "flex-end",
          center: "center",
          between: "space-between",
          around: "space-around",
          evenly: "space-evenly",
        }[inp] as FlexStyle["justifyContent"],
      };
    },
    items: (inp) => {
      return {
        alignItems: {
          start: "flex-start",
          end: "flex-end",
          center: "center",
          baseline: "baseline",
          stretch: "stretch",
        }[inp] as FlexStyle["alignItems"],
      };
    },
    z: (inp) => ({ zIndex: parseInt(inp) }),
    text: (inp) => {
      const [fontSize, lineHeight] = constraints.fontSizes[inp];
      return { fontSize, lineHeight };
    },
    flex: (inp) => {
      return {
        1: { flexGrow: 1, flexShrink: 1, flexBasis: "0%" },
        auto: { flexGrow: 1, flexShrink: 1, flexBasis: "auto" },
        initial: { flexGrow: 0, flexShrink: 1, flexBasis: "auto" },
        none: { flexGrow: 0, flexShrink: 0, flexBasis: "auto" },
        row: { flexDirection: "row" },
        "row-reverse": { flexDirection: "row-reverse" },
        col: { flexDirection: "column" },
        "col-reverse": { flexDirection: "column-reverse" },
        grow: { flexGrow: 1 },
        "grow-0": { flexGrow: 0 },
        shrink: { flexShrink: 1 },
        "shrink-0": { flexShrink: 0 },
        wrap: { flexWrap: "wrap" },
        "wrap-reverse": { flexWrap: "wrap-reverse" },
        nowrap: { flexWrap: "nowrap" },
      }[inp] as FlexStyle;
    },
    shadow: (inp) => {
      const val = constraints.shadows[inp];
      return Platform.select({
        android: { elevation: val?.android || 0 },
        default: {
          shadowOffset: {
            width: val?.ios?.[0] || 0,
            height: val?.ios?.[1] || 0,
          },
          shadowRadius: val?.ios?.[2] || 0,
          shadowOpacity: val?.ios?.[3] || 0,
        },
      });
    },
  };

  /**
   * Our actual builder. Takes an array of "class names" that
   * 	are constructed from our config
   */
  const builder = (...args: Array<StyleName<C>>) => {
    const key = args.join(",");

    // Return from cache if possible.
    if (__cachedStyles[key]) {
      return __cachedStyles[key];
    }

    let styles = {} as Record<string, any>;

    for (let c of args) {
      const m = c.match(/^(.+):(.+)$/);
      const prop = m?.[1];
      const value = m?.[2];
      const handler = config?.[prop as NonSymbol<keyof typeof config>];

      if (prop && value && handler) {
        // @ts-ignore
        styles = { ...styles, ...handler(value) };
      } else {
        // @ts-ignore
        styles = { ...styles, ...(config?.[c]?.() || {}) };
      }
    }

    // Massage for bg-opacity
    if (styles["--bg-opacity"] && styles.backgroundColor) {
      const { r, g, b } = colorStringToRgb(styles.backgroundColor);
      styles.backgroundColor = `rgba(${r}, ${g}, ${b}, ${styles["--bg-opacity"]})`;
      delete styles["--bg-opacity"];
    }

    // Store style in cache
    __cachedStyles[key] = styles;

    return styles;
  };

  type BuilderParams = Array<StyleName<C>>;

  const useTurboStyles = () => builder;

  const useTurboStylesWithDarkMode = () => {
    const colorScheme = useColorScheme();

    return React.useCallback(
      ({ base, dark }: { base: BuilderParams; dark: BuilderParams }) =>
        Object.assign(
          builder(...base),
          colorScheme === "dark" ? builder(...dark) : {}
        ),
      [colorScheme]
    );
  };

  return { builder, useTurboStyles, useTurboStylesWithDarkMode, constraints };
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
