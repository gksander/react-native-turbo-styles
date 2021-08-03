import { StyleHandler, StyleHandlerSet } from "../types";
import { FlexStyle } from "react-native";
import { extractFromBrackets } from "../utils";

export const defaultSpacingHandlers = (constraints = DEFAULT_CONSTRAINTS) => {
  // TODO: Implement this.
  const spacingHandler = (
    properties: (keyof FlexStyle)[],
    isNegative?: boolean
  ) => (val: keyof typeof constraints | `[${string}]`) => {
    const isConstraintKey = (
      val: keyof typeof constraints | `[${string}]`
    ): val is keyof typeof constraints => val in constraints;

    const spaceVal = isConstraintKey(val)
      ? constraints[val]
      : extractFromBrackets(val);

    return properties.reduce<FlexStyle>((acc, prop) => {
      acc[prop] = isNegative
        ? typeof spaceVal === "number"
          ? -spaceVal
          : `-${spaceVal}`
        : spaceVal;
      return acc;
    }, {});
  };

  return {
    m: spacingHandler(["margin"]),
  } as const;
};

const DEFAULT_CONSTRAINTS = {
  0: 0,
  pt: 1,
  0.5: 2,
  1: 4,
  1.5: 6,
  2: 8,
  2.5: 10,
  3: 12,
  3.5: 14,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  11: 44,
  12: 48,
  14: 56,
  16: 64,
  20: 80,
  24: 96,
  28: 112,
  32: 128,
  36: 144,
  40: 160,
  44: 176,
  48: 192,
  52: 208,
  56: 224,
  60: 240,
  64: 256,
  72: 288,
  80: 320,
  96: 384,
  "1/4": "25%",
  "1/2": "50%",
  "3/4": "75%",
  "1/3": "33.3333333%",
  "2/3": "66.666666%",
  "1/5": "20%",
  "2/5": "40%",
  "3/5": "60%",
  "4/5": "80%",
  full: "100%",
};
defaultSpacingHandlers.DEFAULT_CONSTRAINTS = DEFAULT_CONSTRAINTS;
