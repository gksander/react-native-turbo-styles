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
  text: {
    __propertiesToSet: ["fontSize", "lineHeight"],
    "size-xs": [12, 16],
    "size-sm": [14, 20],
    "size-base": [16, 24],
    "size-lg": [18, 28],
    "size-xl": [20, 28],
    "size-2xl": [24, 32],
    "size-3xl": [30, 36],
    "size-4xl": [36, 40],
  },
});
