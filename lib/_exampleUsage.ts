import { createStyleBuilder } from "./createStyleBuilder";
import { StyleSheet } from "react-native";

const spacing = {
  0: 0,
  1: 4,
  1.5: 6,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  "1/4": "25%",
  "1/3": "33.333333%",
  "1/2": "50%",
  "2/3": "66.666666%",
  "3/4": "75%",
  full: "100%",
} as const;

// TODO: Expand these...
const colors = {
  red: "#f00",
  blue: "#00f",
  green: "#0f0",
} as const;

const borderSizes = {
  hairline: StyleSheet.hairlineWidth,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
} as const;

const borderRadii = {
  none: 0,
  sm: 2,
  default: 4,
  md: 6,
  lg: 8,
  xl: 12,
  full: 9999,
} as const;

/**
 * How this thing would actually be used!
 */
export const { builder: sb, config } = createStyleBuilder({
  // Margin
  m: {
    __defaultPropertiesToSet: ["margin"],
    ...spacing,
  },
  mx: {
    __defaultPropertiesToSet: ["marginLeft", "marginRight"],
    ...spacing,
  },
  my: {
    __defaultPropertiesToSet: ["marginTop", "marginBottom"],
    ...spacing,
  },
  ml: {
    __defaultPropertiesToSet: ["marginLeft"],
    ...spacing,
  },
  mr: {
    __defaultPropertiesToSet: ["marginRight"],
    ...spacing,
  },
  mt: {
    __defaultPropertiesToSet: ["marginTop"],
    ...spacing,
  },
  mb: {
    __defaultPropertiesToSet: ["marginBottom"],
    ...spacing,
  },
  // Padding
  p: {
    __defaultPropertiesToSet: ["padding"],
    ...spacing,
  },
  px: {
    __defaultPropertiesToSet: ["paddingLeft", "paddingRight"],
    ...spacing,
  },
  py: {
    __defaultPropertiesToSet: ["paddingTop", "paddingBottom"],
    ...spacing,
  },
  pl: {
    __defaultPropertiesToSet: ["paddingLeft"],
    ...spacing,
  },
  pr: {
    __defaultPropertiesToSet: ["paddingRight"],
    ...spacing,
  },
  pt: {
    __defaultPropertiesToSet: ["paddingTop"],
    ...spacing,
  },
  pb: {
    __defaultPropertiesToSet: ["paddingBottom"],
    ...spacing,
  },
  // Position
  position: {
    __defaultPropertiesToSet: ["position"],
    relative: "relative",
    absolute: "absolute",
  },
  inset: {
    __defaultPropertiesToSet: ["top", "bottom", "left", "right"],
    ...spacing,
  },
  "inset-x": {
    __defaultPropertiesToSet: ["left", "right"],
    ...spacing,
  },
  "inset-y": {
    __defaultPropertiesToSet: ["top", "bottom"],
    ...spacing,
  },
  left: {
    __defaultPropertiesToSet: ["left"],
    ...spacing,
  },
  right: {
    __defaultPropertiesToSet: ["right"],
    ...spacing,
  },
  top: {
    __defaultPropertiesToSet: ["top"],
    ...spacing,
  },
  bottom: {
    __defaultPropertiesToSet: ["bottom"],
    ...spacing,
  },
  // Sizing
  w: {
    __defaultPropertiesToSet: ["width"],
    ...spacing,
  },
  "min-w": {
    __defaultPropertiesToSet: ["minWidth"],
    ...spacing,
  },
  "max-w": {
    __defaultPropertiesToSet: ["maxWidth"],
    ...spacing,
  },
  h: {
    __defaultPropertiesToSet: ["height"],
    ...spacing,
  },
  "min-h": {
    __defaultPropertiesToSet: ["minWidth"],
    ...spacing,
  },
  "max-h": {
    __defaultPropertiesToSet: ["maxHeight"],
    ...spacing,
  },
  bg: {
    __defaultPropertiesToSet: ["backgroundColor"],
    ...colors,
  },
  "bg-opacity": {
    __defaultPropertiesToSet: ["--bg-opacity"],
    0: 0,
    10: 0.1,
    25: 0.25,
    50: 0.5,
    60: 0.6,
    75: 0.75,
    90: 0.9,
    95: 0.95,
    100: 1,
  },
  border: {
    __defaultPropertiesToSet: ["borderWidth"],
    ...borderSizes,
  },
  "border-t": {
    __defaultPropertiesToSet: ["borderTopWidth"],
    ...borderSizes,
  },
  "border-b": {
    __defaultPropertiesToSet: ["borderBottomWidth"],
    ...borderSizes,
  },
  "border-l": {
    __defaultPropertiesToSet: ["borderLeftWidth"],
    ...borderSizes,
  },
  "border-r": {
    __defaultPropertiesToSet: ["borderRightWidth"],
    ...borderSizes,
  },
  "border-color": {
    __defaultPropertiesToSet: ["borderColor"],
    ...colors,
  },
  rounded: {
    __defaultPropertiesToSet: ["borderRadius"],
    ...borderRadii,
  },
  "rounded-t": {
    __defaultPropertiesToSet: ["borderTopLeftRadius", "borderTopRightRadius"],
    ...borderRadii,
  },
  "rounded-b": {
    __defaultPropertiesToSet: [
      "borderBottomLeftRadius",
      "borderBottomRightRadius",
    ],
    ...borderRadii,
  },
  "rounded-l": {
    __defaultPropertiesToSet: ["borderBottomLeftRadius", "borderTopLeftRadius"],
    ...borderRadii,
  },
  "rounded-r": {
    __defaultPropertiesToSet: [
      "borderBottomRightRadius",
      "borderTopRightRadius",
    ],
    ...borderRadii,
  },
  flex: {
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
  },
  justify: {
    __defaultPropertiesToSet: ["justifyContent"],
    start: "flex-start",
    end: "flex-end",
    center: "center",
    between: "space-between",
    around: "space-around",
    evenly: "space-evenly",
  },
  items: {
    __defaultPropertiesToSet: ["alignItems"],
    start: "flex-start",
    end: "flex-end",
    center: "center",
    baseline: "baseline",
    stretch: "stretch",
  },
  // TODO: Typography
  text: {
    "text-xs": {
      fontSize: 12,
      lineHeight: 16,
    },
    "text-sm": {
      fontSize: 14,
      lineHeight: 20,
    },
    "text-base": {
      fontSize: 16,
      lineHeight: 24,
    },
    "text-lg": {
      fontSize: 18,
      lineHeight: 28,
    },
    "text-xl": {
      fontSize: 20,
      lineHeight: 28,
    },
    "text-2xl": {
      fontSize: 24,
      lineHeight: 32,
    },
    "text-3xl": {
      fontSize: 30,
      lineHeight: 36,
    },
    "text-4xl": {
      fontSize: 36,
      lineHeight: 40,
    },
  },
  overflow: {
    __defaultPropertiesToSet: ["overflow"],
    visible: "visible",
    hidden: "hidden",
    scroll: "scroll",
  },
  z: {
    __defaultPropertiesToSet: ["zIndex"],
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    10: 10,
  },
});
