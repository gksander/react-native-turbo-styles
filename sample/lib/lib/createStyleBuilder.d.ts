import { Constraints, StyleName } from "./utilTypes";
/**
 * Create style builder. Pass in constraints, create handler
 */
export declare const createStyleBuilder: <C extends Constraints>(constraints: C) => {
    builder: (...args: StyleName<C>[]) => Record<string, any>;
    useTurboStyles: () => (...args: StyleName<C>[]) => Record<string, any>;
    useTurboStylesWithDarkMode: () => ({ base, dark }: {
        base: StyleName<C>[];
        dark: StyleName<C>[];
    }) => Record<string, any>;
    constraints: C;
};
