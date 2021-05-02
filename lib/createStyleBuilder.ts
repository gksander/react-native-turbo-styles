import { ImageStyle, TextStyle, ViewStyle } from "react-native";
import { hexToRgb } from "./hexToRgb";

const cleanMaybeNumberString = (val: string): string | number =>
  /^\d+$/.test(val) ? Number(val) : val;

type NonSymbol<T> = T extends number | string | symbol ? Exclude<T, symbol> : T;
type ValueOf<T> = T[keyof T];

/**
 * Style builder
 */
export const createStyleBuilder = <
  C extends {
    [key: string]: {
      [key: string]: any;
      __defaultPropertiesToSet?: (
        | keyof ViewStyle
        | keyof TextStyle
        | keyof ImageStyle
        | "--bg-opacity"
      )[];
    };
  },
  P extends {
    [key in keyof C]: `${NonSymbol<key>}-${
      | NonSymbol<keyof Omit<C[key], "__defaultPropertiesToSet">>
      | `[${string}]`}`;
  }
>(
  config: C
) => {
  const builder = (...args: ValueOf<P>[]) => {
    let styles = {} as Record<string | number, any>;

    for (let c of args) {
      const m = c.match(/^(.+)-(.+)$/);
      const prop = m?.[1];
      const value = m?.[2];
      const pertinentCfg = prop ? config?.[prop] : null;

      if (prop && value && pertinentCfg) {
        const partInsideBracket = value.match(/^\[(.*)\]$/)?.[1];

        const val =
          (partInsideBracket && cleanMaybeNumberString(partInsideBracket)) ||
          pertinentCfg?.[value];

        if (val !== undefined && val !== null) {
          if (typeof val === "object") {
            styles = { ...styles, ...val };
          } else if (Array.isArray(pertinentCfg.__defaultPropertiesToSet)) {
            for (const p of pertinentCfg.__defaultPropertiesToSet) {
              styles[p] = val;
            }
          }
        }
      }
    }

    // Massage for bg-opacity
    if (styles["--bg-opacity"] && styles.backgroundColor) {
      const { r, g, b } = hexToRgb(styles.backgroundColor);
      console.log(r, g, b);
      styles.backgroundColor = `rgba(${r}, ${g}, ${b}, ${styles["--bg-opacity"]})`;
    }

    return styles;
  };

  return { builder, config };
};
