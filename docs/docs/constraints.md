---
sidebar_position: 2
---

# Constraints

One of the core tenants of TurboStyles is _design constraints_. This isn't a new idea: your design should generally abide by design constraints. For example, you might have a set sizing scale that's used for sizing/positioning elements. This limits the number of options you have for, say, `padding` &ndash; therefore making your designs more consistent.

When using TurboStyles to create a style builder, you pass in a constraint configuration. The type of this configuration is this:

```ts
type Constraints = {
  sizing: Record<string | number, string | number>;
  colors: Record<string | number, string>;
  opacities: Record<string | number, number>;
  borderSizes: Record<string | number, number>;
  borderRadii: Record<string | number, number>;
  fontSizes: Record<string | number, readonly [number, number]>;
	fontWeights: Record<string | number, TextStyle["fontWeight"]>;
  shadows: Record<
    string | number,
    { android: number; ios: readonly [number, number, number, number] }
  >;
};
```

Each type of constraint is used to constrain one or more properties. For example, `constraints.sizing` is used to constrain `padding`, `margin`, `width`, and more properties.

The following table outlines these constraint types and what they affect.

| Constraint Type | Description |
| --- | --- |
| `sizing` | Used for layout sizing, like `width`, `height`, `padding`, and `margin`. |
| `colors` | Used for background, border, and text colors. |
| `opacities` | Used for background opacity. |
| `borderSizes` | Used for border widths. |
| `borderRadii` | Used for border radius. |
| `fontSizes` | Used for defining font size/line height combinations. |
| `fontWeights` | Used for defining font-weight variants |
| `shadows` | Used for defining shadow properties. On Android, sets `elevation`. For iOS, it's `[shadowOffset.width, shadowOffset.height, shadowRadius, shadowOpacity]` |

To see specifically what properties each constraint actually constrains, check out [the list of available "classes"](./available-classes.md).
