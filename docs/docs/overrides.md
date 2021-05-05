---
sidebar_position: 6
---

# Overrides

Design-by-constraint is great in theory, but in practice there are times where you need to break free from the design constraints. E.g., maybe you have some sort of math computation for the width of an element. To break free from the theme constraints, some properties allow for "overrides" using square-bracket syntax.

The standard constraint-based syntax for `margin` would look something like `m:2` (where `2` is a `constraints.sizing` key). If you want to specify some non-constraint value for `margin`, you can write `m:[...]` where `...` is whatever value you need. For example, `m:[23%]` sets `margin: 23%`.

A more realistic example of this might be something like:

```tsx
// Imports...
import { createStyleBuilder, ConstraintOverride, defaultConstraints } from "react-native-turbo-styles";

const { useTurboStyles } = createStyleBuilder(defaultConstraints);

const SomeComponent = () => {
  const ts = useTurboStyles();
  const { width } = useWindowDimensions();
  const elWidth = (width - 2 * 32) / 3;
  
  return <View style={ts(`w:[${elWidth}]` as ConstraintOverride<'w'>)} />;
}
```

One important thing to note here is this bit: `as ConstraintOverride<'w'>`. TS template literal types can't infer from string template literal values. That is, `w:[${elWidth}]` is "too hard" for TS to understand as an override here, so we have to help TS out a bit and declare that we're overriding. This is only needed when your override value is a template literal value, but simple string literals don't need this (e.g., `w:[57.3]` is just fine).

