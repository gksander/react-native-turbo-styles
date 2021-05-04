import { createStyleBuilder } from "./createStyleBuilder";
import { defaultConstraints } from "./defaultConstraints";
import { renderHook } from "@testing-library/react-hooks";

let colorScheme = "light";
jest.mock("react-native", () => ({
  StyleSheet: {
    hairlineWidth: 0.5,
  },
  useColorScheme: () => colorScheme,
}));

const setup = () => createStyleBuilder(defaultConstraints);

describe("useTurboStyles", () => {
  beforeEach(() => {
    colorScheme = "light";
  });

  test("useTurboStyles returns a function that creates style objects", () => {
    const { useTurboStyles, builder } = setup();
    const { result } = renderHook(() => useTurboStyles());

    expect(result.current("mx:3", "py:2")).toEqual(builder("mx:3", "py:2"));
    expect(result.current("bg:blue-300", "bg-opacity:25")).toEqual(
      builder("bg:blue-300", "bg-opacity:25")
    );
  });

  test("useTurboStylesWithDarkMode creates base styles in light mode", () => {
    colorScheme = "light";

    const { builder, useTurboStylesWithDarkMode } = setup();
    const { result } = renderHook(() => useTurboStylesWithDarkMode());

    expect(
      result.current({ base: ["mx:3", "py:2"], dark: ["bg:red-300"] })
    ).toEqual(builder("mx:3", "py:2"));
  });

  test("useTurboStylesWithDarkMode creates merged styles in dark mode", () => {
    colorScheme = "dark";

    const { builder, useTurboStylesWithDarkMode } = setup();
    const { result } = renderHook(() => useTurboStylesWithDarkMode());

    expect(
      result.current({ base: ["mx:3", "py:2"], dark: ["bg:red-300"] })
    ).toEqual(builder("mx:3", "py:2", "bg:red-300"));
  });
});
