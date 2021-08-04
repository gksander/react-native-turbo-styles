import { SimpleConstrainedCache } from "./SimpleConstrainedCache";
import { colorStringToRgb } from "./util/colorStringToRgb";
import {
  ClassName,
  InvertClassName,
  NonSymbol,
  ReturnStyle,
  StyleHandlerSet,
} from "types";

/**
 * Style builder function (doesn't do anything, but is typed)
 */
export const createStyleBuilder = <StyleHandlers extends StyleHandlerSet>({
  handlers,
}: {
  handlers: StyleHandlers;
}) => {
  const __cachedStyles = new SimpleConstrainedCache({ maxNumRecords: 250 });

  const builder = <Cn extends ClassName<StyleHandlers>>(
    ...args: Cn[]
  ): ReturnStyle<StyleHandlers, InvertClassName<StyleHandlers, Cn>> => {
    const key = args.join(",");

    // Return from cache if possible.
    if (__cachedStyles.has(key)) {
      return __cachedStyles.get(key);
    }

    let styles = {} as ReturnStyle<
      StyleHandlers,
      InvertClassName<StyleHandlers, Cn>
    > & {
      "--bg-opacity"?: number;
    };

    for (let c of args) {
      const m = c.match(/^(.+):(.+)$/);
      const prop = m?.[1];
      const value = m?.[2];
      const handler =
        handlers?.[prop as NonSymbol<keyof typeof handlers>] || handlers?.[c];

      // TODO: BUTTON THIS SHIT UP
      if (handler) {
        // @ts-ignore
        Object.assign(styles, handler(value));
      }
    }

    // TODO: BUTTON THIS SHIT UP
    // Massage for bg-opacity
    // @ts-ignore
    if (typeof styles["--bg-opacity"] === "number" && styles?.backgroundColor) {
      // @ts-ignore
      const { r, g, b } = colorStringToRgb(styles.backgroundColor);
      // @ts-ignore
      styles.backgroundColor = `rgba(${r}, ${g}, ${b}, ${styles["--bg-opacity"]})`;
    }
    delete styles["--bg-opacity"];

    // Store style in cache
    __cachedStyles.set(key, styles);

    return styles;
  };

  return { builder };
};
