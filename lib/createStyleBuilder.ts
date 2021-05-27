import {
  FlexStyle,
  ImageStyle,
  Platform,
  TextStyle,
  ViewStyle,
} from "react-native";
import { colorStringToRgb } from "./colorStringToRgb";
import {
  BorderRadiusHandler,
  borderRadiusInput,
  BorderSizeHandler,
  borderSizeInput,
  Builder,
  ColorHandler,
  colorInput,
  Config,
  Constraints,
  NonSymbol,
  SizeHandler,
  sizeInput,
} from "./utilTypes";
import { SimpleConstrainedCache } from "./SimpleConstrainedCache";

/**
 * Create style builder. Pass in constraints, create handler
 */
export const createStyleBuilder = <C extends Constraints>(constraints: C) => {
  const __cachedStyles = new SimpleConstrainedCache({ maxNumRecords: 250 });

  const getSizeValue = (val: sizeInput<C>): string | number | undefined => {
    return constraints.sizing?.[val] ?? extractFromBrackets(val);
  };
  const sizeHandler = (
    properties: Array<keyof FlexStyle>,
    isNegative?: boolean
  ): SizeHandler<C> => (key: sizeInput<C>) => {
    const val = getSizeValue(key);
    return properties.reduce<FlexStyle>((acc, prop) => {
      // @ts-ignore
      acc[prop] = isNegative
        ? typeof val === "number"
          ? -val
          : `-${val}`
        : val;
      return acc;
    }, {});
  };

  const getColorValue = (val: colorInput<C>): string | undefined => {
    const constrainedValue = constraints.colors?.[val];
    if (constrainedValue) return constrainedValue;

    const bracketValue = extractFromBrackets(val);
    if (bracketValue) {
      return String(bracketValue);
    }

    return undefined;
  };
  const colorHandler = <S extends TextStyle | ImageStyle = TextStyle>(
    ...properties: Array<keyof S>
  ): ColorHandler<C, S> => (inp) => {
    const val = getColorValue(inp);
    return properties.reduce<S>((acc, prop) => {
      // @ts-ignore
      acc[prop] = val;
      return acc;
    }, {} as S);
  };

  // Border sizing
  const getBorderSizeValue = (
    val: borderSizeInput<C>
  ): string | number | undefined => {
    return constraints.borderSizes?.[val] ?? extractFromBrackets(val);
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
    return constraints.borderRadii?.[val] ?? extractFromBrackets(val);
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
    m: sizeHandler(["margin"]),
    "-m": sizeHandler(["margin"], true),
    mx: sizeHandler(["marginLeft", "marginRight"]),
    "-mx": sizeHandler(["marginLeft", "marginRight"], true),
    my: sizeHandler(["marginTop", "marginBottom"]),
    "-my": sizeHandler(["marginTop", "marginBottom"], true),
    ml: sizeHandler(["marginLeft"]),
    "-ml": sizeHandler(["marginLeft"], true),
    mr: sizeHandler(["marginRight"]),
    "-mr": sizeHandler(["marginRight"], true),
    mt: sizeHandler(["marginTop"]),
    "-mt": sizeHandler(["marginTop"], true),
    mb: sizeHandler(["marginBottom"]),
    "-mb": sizeHandler(["marginBottom"], true),
    // Padding
    p: sizeHandler(["padding"]),
    px: sizeHandler(["paddingLeft", "paddingRight"]),
    py: sizeHandler(["paddingTop", "paddingBottom"]),
    pl: sizeHandler(["paddingLeft"]),
    pr: sizeHandler(["paddingRight"]),
    pt: sizeHandler(["paddingTop"]),
    pb: sizeHandler(["paddingBottom"]),
    // Inset/position
    inset: sizeHandler(["top", "bottom", "left", "right"]),
    "-inset": sizeHandler(["top", "bottom", "left", "right"], true),
    "inset-x": sizeHandler(["left", "right"]),
    "-inset-x": sizeHandler(["left", "right"], true),
    "inset-y": sizeHandler(["top", "bottom"]),
    "-inset-y": sizeHandler(["top", "bottom"], true),
    left: sizeHandler(["left"]),
    "-left": sizeHandler(["left"], true),
    right: sizeHandler(["right"]),
    "-right": sizeHandler(["right"], true),
    top: sizeHandler(["top"]),
    "-top": sizeHandler(["top"], true),
    bottom: sizeHandler(["bottom"]),
    "-bottom": sizeHandler(["bottom"], true),
    // Sizing
    w: sizeHandler(["width"]),
    "min-w": sizeHandler(["minWidth"]),
    "max-w": sizeHandler(["maxWidth"]),
    h: sizeHandler(["height"]),
    "min-h": sizeHandler(["minHeight"]),
    "max-h": sizeHandler(["maxHeight"]),
    // Colors
    bg: colorHandler("backgroundColor"),
    "border-color": colorHandler("borderColor"),
    color: colorHandler("color"),
    "bg-opacity": (inp) => {
      const constrainedVal = constraints.opacities?.[inp];
      if (typeof constrainedVal === "number")
        return { "--bg-opacity": constrainedVal };

      const bracketVal = Number(extractFromBrackets(inp));
      if (!isNaN(bracketVal)) {
        return { "--bg-opacity": bracketVal };
      }

      return {};
    },
    opacity: (inp: NonSymbol<keyof C["opacities"]> | `[${number}]`) => {
      const val = constraints.opacities?.[inp] ?? extractFromBrackets(inp);
      return <ViewStyle>{ opacity: val };
    },
    relative: () => ({ position: "relative" }),
    absolute: () => ({ position: "absolute" }),
    hidden: () => ({ display: "none" }),
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
      const [fontSize, lineHeight] = constraints.fontSizes?.[inp] || [
        undefined,
        undefined,
      ];
      return { fontSize, lineHeight };
    },
    "font-weight": (inp) => {
      const val = constraints.fontWeights?.[inp];
      return { fontWeight: val };
    },
    italic: () => ({ fontStyle: "italic" }),
    "text-align": (textAlign) => ({ textAlign }),
    uppercase: () => ({ textTransform: "uppercase" }),
    lowercase: () => ({ textTransform: "lowercase" }),
    capitalize: () => ({ textTransform: "capitalize" }),
    underline: () => ({ textDecorationLine: "underline" }),
    "line-through": () => ({ textDecorationLine: "line-through" }),
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
      const val = constraints.shadows?.[inp];
      if (!val) return {};
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
    resize: (resizeMode) => ({ resizeMode }),
    tint: colorHandler("tintColor"),
    aspect: (inp) => {
      const cVal = constraints.aspectRatios?.[inp];
      if (cVal) {
        return { aspectRatio: cVal[0] / cVal[1] };
      }

      const overrideVal = extractFromBrackets(inp);
      if (typeof overrideVal === "number") {
        return { aspectRatio: overrideVal };
      }

      return {};
    },
  };

  /**
   * Our actual builder. Takes an array of "class names" that
   * 	are constructed from our config
   */
  const builder: Builder<C> = (...args) => {
    const key = args.join(",");

    // Return from cache if possible.
    if (__cachedStyles.has(key)) {
      return __cachedStyles.get(key);
    }

    let styles = {} as Record<string, any>;

    for (let c of args) {
      const m = c.match(/^(.+):(.+)$/);
      const prop = m?.[1];
      const value = m?.[2];
      const handler = config?.[prop as NonSymbol<keyof typeof config>];

      if (prop && value && handler) {
        // @ts-ignore
        Object.assign(styles, handler(value));
      } else {
        // @ts-ignore
        Object.assign(styles, config?.[c]?.() || {});
      }
    }

    // Massage for bg-opacity
    if (typeof styles["--bg-opacity"] === "number" && styles.backgroundColor) {
      const { r, g, b } = colorStringToRgb(styles.backgroundColor);
      styles.backgroundColor = `rgba(${r}, ${g}, ${b}, ${styles["--bg-opacity"]})`;
    }
    delete styles["--bg-opacity"];

    // Store style in cache
    __cachedStyles.set(key, styles);

    return styles;
  };

  return { builder, constraints };
};

/**
 * If string looks like number, make it number
 */
const cleanMaybeNumberString = (val: string): string | number =>
  !isNaN(Number(val)) ? Number(val) : val;

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
