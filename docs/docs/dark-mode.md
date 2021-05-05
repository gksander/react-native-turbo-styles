---
sidebar_position: 7
---

# Dark Mode

TurboStyles offers dark-mode support. The general philosophy here is this:

- You apply a set of "base" styles.
- You provide an additional set of styles to be merged into your "base styles" when in dark mode.

Therefore, we provide a separate hook `useTurboStylesWithDarkMode` for handling this. It's usage looks like this:

```tsx
import { View } from "react-native";
import {
  createStyleBuilder,
  defaultConstraints,
} from "react-native-turbo-styles";

const { useTurboStylesWithDarkMode } = createStyleBuilder(defaultConstraints);

const Foo = () => {
  const ts = useTurboStylesWithDarkMode();

  return (
    <View
      style={ts({
        base: ["w:32", "h:32", "p:3", "bg:red-100"],
        dark: ["bg:red-900"],
      })}
    />
  );
};
```

**NOTE!** React Native's `Appearance` API, which this leverages, doesn't work when connected to Chrome debugger:

> Note: getColorScheme() will always return light when debugging with Chrome.
