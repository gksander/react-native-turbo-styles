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

/**
 * Types for createStyleBuilder
 */
export type StyleHandler = (...args: any[]) => object;
export type StyleHandlerSet = {
  [key: string]: StyleHandler;
};
export type Prefix<P extends StyleHandlerSet> = keyof P;
export type ClassName<P extends StyleHandlerSet, Pf extends keyof P> = ValueOf<
  {
    [K in keyof Pick<P, Pf>]: Parameters<P[K]>[0] extends undefined
      ? `${NonSymbol<K>}`
      : `${NonSymbol<K>}:${Parameters<P[K]>[0]}`;
  }
>;
export type ReturnStyle<
  P extends StyleHandlerSet,
  Pf extends keyof P
> = UnionToIntersection<
  ValueOf<
    {
      [K in keyof Pick<P, Pf>]: ReturnType<P[K]>;
    }
  >
>;
