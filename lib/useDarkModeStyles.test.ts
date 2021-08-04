import { createStyleBuilder } from "./old/createStyleBuilder";
import { defaultConstraints } from "./old/defaultConstraints";
import { renderHook } from "@testing-library/react-hooks";
import { useDarkModeStyles } from "./useDarkModeStyles";

let colorScheme = "light";
jest.mock("react-native", () => ({
  StyleSheet: {
    hairlineWidth: 0.5,
  },
  useColorScheme: () => colorScheme,
}));

const setup = () => createStyleBuilder(defaultConstraints);

describe("useDarkModeStyles", () => {
  beforeEach(() => {
    colorScheme = "light";
  });

  test("useTurboStylesWithDarkMode creates base styles in light mode", () => {
    colorScheme = "light";

    const { builder } = setup();
    const { result } = renderHook(() => useDarkModeStyles(builder));

    expect(
      result.current({ base: ["mx:3", "py:2"], dark: ["bg:red-300"] })
    ).toEqual(builder("mx:3", "py:2"));
  });

  test("useTurboStylesWithDarkMode creates merged styles in dark mode", () => {
    colorScheme = "dark";

    const { builder } = setup();
    const { result } = renderHook(() => useDarkModeStyles(builder));

    expect(
      result.current({ base: ["mx:3", "py:2"], dark: ["bg:red-300"] })
    ).toEqual(builder("mx:3", "py:2", "bg:red-300"));
  });
});
