# React Native Turbo Styles

React Native Turbo Styles is a TailwindCSS-inspired styling library for React Native with a goal of:

- Design by constraints (using theme-constraints to guide design).
- Styling ergonomics (short, nemonic "names" for styles, similar to utility classes in CSS).
- Strongly-typed.

![Example of auto-complete using TurboStyles](./docs/img/turbo-styles-sample.gif)

## Usage

The usage model for Turbo Styles is this:

- In a React Native project, install the library via `npm install react-native-turbo-styles` or `yarn add react-native-turbo-styles`.
- You provide a "constraints" configuration (things like sizing scale, colors, border radii, etc.). The library provides a default constraints configuration based on the default [TailwindCSS](https://tailwindcss.com/) configuration.
- The library creates a "style builder" function based on this constraint configuration.
- You use this "style builder" to nicely generate styles using style "names" based on your constraints.

The most basic usage then boils down to executing this command...

```shell
yarn add react-native-turbo-styles
```

and writing some code like this...

```tsx
import { View } from 'react-native';
import { createStyleBuilder, defaultConstraints } from "react-native-turbo-styles";

// Create builder based on provided default constraints
const { builder: tb } = createStyleBuilder(defaultConstraints);

// Use the builder
const Foo = () => <View style={tb('w-32', 'h-32', 'p-3', 'bg-red100')} />;
```

## Constraints

One of the core tenants of RN Turbo Styles is _design constraints_. This isn't a new idea: your design should generally abide by design constraints. For example, you might have a set sizing scale that's used for sizing/positioning elements. This limits the number of options you have for, say, `padding` - therefore making your designs more consistent.

When using RN Turbo Styles to create a style builder, you pass in a constraint configuration. The type of this configuration is:

```ts
type Constraints = {
  sizing: Record<string | number, string | number>;
  colors: Record<string | number, string>;
  opacities: Record<string | number, number>;
  borderSizes: Record<string | number, number>;
  borderRadii: Record<string | number, number>;
  fontSizes: Record<string | number, readonly [number, number]>;
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

## Default Constraints

RN Turbo Styles is a "bring your own constraints" library and lets you set your own design constraints. However, we provide a default constraint configuration that is modeled after the one provided by [TailwindCSS](https://tailwindcss.com/). If you want to see the default constraints, [check out the source file](https://github.com/gksander/react-native-turbo-styles/blob/main/lib/defaultConstraints.ts).

You can import the default constraints as follows:

```ts
import { defaultConstraints } from "react-native-turbo-styles";
```

Since `defaultConstraints` is just a plain ol' JavaScript object, you can override properties of it as you see fit. E.g., adding a new color:

```ts
import { createStyleBuilder, defaultConstraints } from "react-native-turbo-styles";

const { builder } = createStyleBuilder({
  ...defaultConstraints,
  colors: {
    ...defaultConstraints.colors,
    gold: '#c4ac2a'
  }
});
```

## Overrides

Design-by-constraint is great in theory, but in practice there are times where you need to break free from the design constraints. E.g., maybe you have some sort of math computation for the width of an element. To break free from the theme constraints, some properties allow for "overrides" using square-bracket syntax.

The standard constraint-based syntax for `margin` would look something like `m-2` (where `2` is a `constraints.sizing` key). If you want to specify some non-constraint value for `margin`, you can write `m-[...]` where `...` is whatever value you need. For example, `m-[23%]` sets `margin: 23%`.

A more realistic example of this might be something like:

```tsx
// Imports...
import { createStyleBuilder, ConstraintOverride, defaultConstraints } from "react-native-turbo-styles";

const { builder: sb } = createStyleBuilder(defaultConstraints);

const SomeComponent = () => {
  const { width } = useWindowDimensions();
  const elWidth = (width - 2 * 32) / 3;
  
  return <View style={sb(`m-[${elWidth}]` as ConstraintOverride<'m'>)} />;
}
```

One important thing to note here is this bit: `as ConstraintOverride<'m'>`. TS template literal types can't infer from string template literal values. That is, `m-[${elWidth}]` is "too hard" for TS to understand as an override here, so we have to help TS out a bit and declare that we're overriding. This is only needed when your override value is a template literal value, but simple string literals don't need this (e.g., `m-[57.3]` is just fine).

## Available Properties

TODO: Fill this in...

## TODO:

- [ ] More tests...
- [ ] More properties...
- [ ] Clean up code...
- [ ] Memoize...
