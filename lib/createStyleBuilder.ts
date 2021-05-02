import { ImageStyle, TextStyle, ViewStyle } from "react-native";
import { hexToRgb } from "./hexToRgb";
import { colorStringToRgb } from "./colorStringToRgb";

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
      __propertiesToSet: (
        | keyof ViewStyle
        | keyof TextStyle
        | keyof ImageStyle
        | "--bg-opacity"
      )[];
    };
  },
  P extends {
    [key in keyof C]: `${NonSymbol<key>}-${
      | NonSymbol<keyof Omit<C[key], "__propertiesToSet">>
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

        const val = (() => {
          if (partInsideBracket) {
            return partInsideBracket
              .split(",")
              .map((bit) => cleanMaybeNumberString(bit.trim()));
          } else {
            return pertinentCfg?.[value];
          }
        })();

        if (val !== undefined && val !== null) {
          const isValArray = Array.isArray(val);
          for (const i in pertinentCfg.__propertiesToSet) {
            const p = pertinentCfg.__propertiesToSet[i];
            styles[p] = isValArray ? (val.length === 1 ? val[0] : val[i]) : val;
          }
        }
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

  return { builder, config };
};
