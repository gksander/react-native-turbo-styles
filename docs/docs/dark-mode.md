---
sidebar_position: 6
---

# Dark Mode

TurboStyles offers dark-mode support, which isn't something commonly found in a React Native styling library. The general philosophy here is this:

- You apply a set of "base" styles.
- You provide an additional set of styles to be merged into your "base styles" when in dark mode.

Therefore, we provide a separate hook `useDarkModeStyles` for handling this. It's usage looks like this:

```tsx
import { View } from "react-native";
import {
  createStyleBuilder,
  defaultConstraints,
  useDarkModeStyles,
} from "react-native-turbo-styles";

const { builder: sb } = createStyleBuilder(defaultConstraints);

const Foo = () => {
  const dmStyles = useDarkModeStyles(sb);

  return (
    <View
      style={dmStyles({
        base: ["w:32", "h:32", "p:3", "bg:red-100"],
        dark: ["bg:red-900"],
      })}
    />
  );
};
```

The `useDarkModeStyles` hook creates a slightly-modified style builder that has the following type:

```ts
useDarkModeStyles(builder: Builder): (args: { base: ClassName[], dark: ClassName[] }) => object;
```

where `ClassName[]` is just an array-form of the arguments you'd generally pass to a `builder` from `createStyleBuilder`.

:::caution
React Native's `Appearance` API, which this leverages, doesn't work when connected to Chrome debugger:

> Note: getColorScheme() will always return light when debugging with Chrome.

If you're testing this out on a simulator, it might appear like dark mode is not working. You may need to install the app on a physical device to test this.
:::

## Generalizing this Hook

Notice that the `useDarkModeStyles` hook requires you to pass in a style builder. This is for building styles with your style builder, and for type-inference. If you're using this hook regularly, it's probably worth abstracting this into your own custom hook. Something like the following:

```ts
// myTurboStyles.ts
import { createStyleBuilder, defaultConstraints, useDarkModeStyles } from "react-native-turbo-styles";

export const { builder: sb } = createStyleBuilder(defaultConstraints);
export const useDarkStyles = () => useDarkModeStyles(sb);

/**
 * Somewhere else...
 */
import * as React from 'react';
import { useDarkStyles } from './myTurboStyles';

export const MyComponent: React.FC = () => {
  const darkStyles = useDarkStyles();
  
  // Markup...
}
```
