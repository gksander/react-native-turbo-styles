---
sidebar_position: 5
---

# Overrides

Design-by-constraint is great in theory, but in practice there are times when you need to break free from the design constraints. E.g., maybe you need to use a one-off value ("magical number"), or have some sort of math computation for the width of an element. To break free from the theme constraints, some properties allow for "overrides" using square-bracket syntax.

The standard constraint-based syntax for `margin` would look something like `m:2` (where `2` is a `constraints.sizing` key). If you want to specify some non-constraint value for `margin`, you can write `m:[...]` where `...` is whatever value you need. For example, `m:[23%]` sets `margin: 23%`.

## An Example

Let's suppose you want an "overflow" effect, where a child element spills out of its parent.

![Override example, child element spilling out of parent](/img/screenshots/override-example.png)

A common way to handle this is to use negative position values. Here's how we could implement that with overrides:

```tsx
import * as React from "react";
import { View } from "react-native";
import { ts } from "./myTurboStyles";

export const OverrideExample: React.FC = () => {
  return (
    <View style={ts("flex:1", "bg:gray-300", "justify:center", "items:center")}>
      <View style={ts("w:32", "h:32", "bg:white")}>
        <View
          style={ts(
            "absolute",
            "h:12",
            "bg:purple-500",
            "top:[-10]",
            "inset-x:[-10]"
          )}
        />
      </View>
    </View>
  );
};
```

Notice the `top:[-10]` and `inset-x:[-10]`. We can use overrides to set those position values to `-10` (which might not be in our constraints configuration).

## Computed Values in Overrides

Another usage of override values is when needing to use a computed value for an override. Here's a made-up example where a rectangle needs to be some fraction of the screen size:

```tsx
import * as React from "react";
import { useWindowDimensions, View } from "react-native";
import { ts } from "./myTurboStyles";
import { ConstraintOverride } from "react-native-turbo-styles";

export const ComputedOverrideExample: React.FC = () => {
  const { width } = useWindowDimensions();
  const rectWidth = (width - 32) / 3;

  return (
    <View style={ts("flex:1", "bg:gray-200", "justify:center", "items:center")}>
      <View
        style={ts(
          `w:[${rectWidth}]` as ConstraintOverride<"w">,
          "h:10",
          "bg:red-300"
        )}
      />
    </View>
  );
};
```

One important thing to note here is this bit: `as ConstraintOverride<'w'>`. TS template literal types can't infer from string template literal values. That is, `w:[${rectWidth}]` is "too hard" for TS to understand as an override here, so we have to help TS out a bit and declare that we're overriding. This is only needed when your override value is a template literal value, but simple string literals don't need this (e.g., `w:[57.3]` is just fine).

