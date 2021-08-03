/**
 * If string looks like number, make it number
 */
export const cleanMaybeNumberString = (val: string): string | number =>
  !isNaN(Number(val)) ? Number(val) : val;

/**
 * Extract value from brackets, e.g. [32] -> 32
 */
export const extractFromBrackets = (
  val: string | number
): string | number | undefined => {
  const insideBracket = (typeof val === "string" ? val : String(val)).match(
    /^\[(.*)\]$/
  )?.[1];
  if (insideBracket) {
    return cleanMaybeNumberString(insideBracket);
  } else {
    return undefined;
  }
};
