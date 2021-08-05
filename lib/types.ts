/**
 * Utilities
 */
export type NonSymbol<T> = Exclude<T, symbol>;
export type ValueOf<T> = T[keyof T];
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;
export type Override<T extends string | number> = `[${T}]`;

export type BgOpacityRecord = { "--bg-opacity"?: number };

/**
 * Types for createStyleBuilder
 */
export type StyleHandler = (...args: any[]) => object;
export type StyleHandlerSet = {
  [key: string]: StyleHandler;
};
export type ClassName<P extends StyleHandlerSet> = ValueOf<
  {
    [K in keyof P]: Parameters<P[K]>[0] extends undefined
      ? `${NonSymbol<K>}`
      : `${NonSymbol<K>}:${Parameters<P[K]>[0]}`;
  }
>;

export type InvertClassName<
  P extends StyleHandlerSet,
  Cn extends ClassName<P>
> = Cn extends `${infer K1}:${any}`
  ? K1
  : Cn extends `${infer K2}`
  ? K2
  : never;

export type ReturnStyle<
  P extends StyleHandlerSet,
  T extends string
> = UnionToIntersection<
  ValueOf<
    {
      [K in T]: ReturnType<P[K]> extends BgOpacityRecord
        ? never
        : ReturnType<P[K]>;
    }
  >
>;

export type ConstraintOverride<T extends string> = `${T}:[${string}]`;
