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
    __propertiesToSet: ["margin"],
    ...spacing,
  },
  mx: {
    __propertiesToSet: ["marginLeft", "marginRight"],
    ...spacing,
  },
  my: {
    __propertiesToSet: ["marginTop", "marginBottom"],
    ...spacing,
  },
  ml: {
    __propertiesToSet: ["marginLeft"],
    ...spacing,
  },
  mr: {
    __propertiesToSet: ["marginRight"],
    ...spacing,
  },
  mt: {
    __propertiesToSet: ["marginTop"],
    ...spacing,
  },
  mb: {
    __propertiesToSet: ["marginBottom"],
    ...spacing,
  },
  // Padding
  p: {
    __propertiesToSet: ["padding"],
    ...spacing,
  },
  px: {
    __propertiesToSet: ["paddingLeft", "paddingRight"],
    ...spacing,
  },
  py: {
    __propertiesToSet: ["paddingTop", "paddingBottom"],
    ...spacing,
  },
  pl: {
    __propertiesToSet: ["paddingLeft"],
    ...spacing,
  },
  pr: {
    __propertiesToSet: ["paddingRight"],
    ...spacing,
  },
  pt: {
    __propertiesToSet: ["paddingTop"],
    ...spacing,
  },
  pb: {
    __propertiesToSet: ["paddingBottom"],
    ...spacing,
  },
  // Position
  position: {
    __propertiesToSet: ["position"],
    relative: "relative",
    absolute: "absolute",
  },
  inset: {
    __propertiesToSet: ["top", "bottom", "left", "right"],
    ...spacing,
  },
  "inset-x": {
    __propertiesToSet: ["left", "right"],
    ...spacing,
  },
  "inset-y": {
    __propertiesToSet: ["top", "bottom"],
    ...spacing,
  },
  left: {
    __propertiesToSet: ["left"],
    ...spacing,
  },
  right: {
    __propertiesToSet: ["right"],
    ...spacing,
  },
  top: {
    __propertiesToSet: ["top"],
    ...spacing,
  },
  bottom: {
    __propertiesToSet: ["bottom"],
    ...spacing,
  },
  // Sizing
  w: {
    __propertiesToSet: ["width"],
    ...spacing,
  },
  "min-w": {
    __propertiesToSet: ["minWidth"],
    ...spacing,
  },
  "max-w": {
    __propertiesToSet: ["maxWidth"],
    ...spacing,
  },
  h: {
    __propertiesToSet: ["height"],
    ...spacing,
  },
  "min-h": {
    __propertiesToSet: ["minWidth"],
    ...spacing,
  },
  "max-h": {
    __propertiesToSet: ["maxHeight"],
    ...spacing,
  },
  bg: {
    __propertiesToSet: ["backgroundColor"],
    ...colors,
  },
  "bg-opacity": {
    __propertiesToSet: ["--bg-opacity"],
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
    __propertiesToSet: ["borderWidth"],
    ...borderSizes,
  },
  "border-t": {
    __propertiesToSet: ["borderTopWidth"],
    ...borderSizes,
  },
  "border-b": {
    __propertiesToSet: ["borderBottomWidth"],
    ...borderSizes,
  },
  "border-l": {
    __propertiesToSet: ["borderLeftWidth"],
    ...borderSizes,
  },
  "border-r": {
    __propertiesToSet: ["borderRightWidth"],
    ...borderSizes,
  },
  "border-color": {
    __propertiesToSet: ["borderColor"],
    ...colors,
  },
  rounded: {
    __propertiesToSet: ["borderRadius"],
    ...borderRadii,
  },
  "rounded-t": {
    __propertiesToSet: ["borderTopLeftRadius", "borderTopRightRadius"],
    ...borderRadii,
  },
  "rounded-b": {
    __propertiesToSet: ["borderBottomLeftRadius", "borderBottomRightRadius"],
    ...borderRadii,
  },
  "rounded-l": {
    __propertiesToSet: ["borderBottomLeftRadius", "borderTopLeftRadius"],
    ...borderRadii,
  },
  "rounded-r": {
    __propertiesToSet: ["borderBottomRightRadius", "borderTopRightRadius"],
    ...borderRadii,
  },
  // TODO: This doesn't work.
  // flex: {
  //   1: { flexGrow: 1, flexShrink: 1, flexBasis: "0%" },
  //   auto: { flexGrow: 1, flexShrink: 1, flexBasis: "auto" },
  //   initial: { flexGrow: 0, flexShrink: 1, flexBasis: "auto" },
  //   none: { flexGrow: 0, flexShrink: 0, flexBasis: "auto" },
  //   row: { flexDirection: "row" },
  //   "row-reverse": { flexDirection: "row-reverse" },
  //   col: { flexDirection: "column" },
  //   "col-reverse": { flexDirection: "column-reverse" },
  //   grow: { flexGrow: 1 },
  //   "grow-0": { flexGrow: 0 },
  //   shrink: { flexShrink: 1 },
  //   "shrink-0": { flexShrink: 0 },
  //   wrap: { flexWrap: "wrap" },
  //   "wrap-reverse": { flexWrap: "wrap-reverse" },
  //   nowrap: { flexWrap: "nowrap" },
  // },
  justify: {
    __propertiesToSet: ["justifyContent"],
    start: "flex-start",
    end: "flex-end",
    center: "center",
    between: "space-between",
    around: "space-around",
    evenly: "space-evenly",
  },
  items: {
    __propertiesToSet: ["alignItems"],
    start: "flex-start",
    end: "flex-end",
    center: "center",
    baseline: "baseline",
    stretch: "stretch",
  },
  text: {
    __propertiesToSet: ["fontSize", "lineHeight"],
    "text-xs": [12, 16],
    "text-sm": [14, 20],
    "text-base": [16, 24],
    "text-lg": [18, 28],
    "text-xl": [20, 28],
    "text-2xl": [24, 32],
    "text-3xl": [30, 36],
    "text-4xl": [36, 40],
  },
  overflow: {
    __propertiesToSet: ["overflow"],
    visible: "visible",
    hidden: "hidden",
    scroll: "scroll",
  },
  z: {
    __propertiesToSet: ["zIndex"],
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    10: 10,
  },
});
