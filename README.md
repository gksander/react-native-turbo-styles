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
const { builder: ts } = createStyleBuilder(defaultConstraints);

// Use the builder
const Foo = () => <View style={ts('w:32', 'h:32', 'p:3', 'bg:red-100')} />;
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

The standard constraint-based syntax for `margin` would look something like `m:2` (where `2` is a `constraints.sizing` key). If you want to specify some non-constraint value for `margin`, you can write `m:[...]` where `...` is whatever value you need. For example, `m:[23%]` sets `margin: 23%`.

A more realistic example of this might be something like:

```tsx
// Imports...
import { createStyleBuilder, ConstraintOverride, defaultConstraints } from "react-native-turbo-styles";

const { builder: ts } = createStyleBuilder(defaultConstraints);

const SomeComponent = () => {
  const { width } = useWindowDimensions();
  const elWidth = (width - 2 * 32) / 3;
  
  return <View style={ts(`w:[${elWidth}]` as ConstraintOverride<'w'>)} />;
}
```

One important thing to note here is this bit: `as ConstraintOverride<'w'>`. TS template literal types can't infer from string template literal values. That is, `w:[${elWidth}]` is "too hard" for TS to understand as an override here, so we have to help TS out a bit and declare that we're overriding. This is only needed when your override value is a template literal value, but simple string literals don't need this (e.g., `w:[57.3]` is just fine).

## Available "Classes"

| Prefix | Argument | Overridable | Properties Set | Example |
| --- | --- | --- | --- | --- |
| `m:` | `keyof Constraints['sizing']` | ✅ | `margin` | `m:0`, `m:[32]` |
| `mx:` | `keyof Constraints['sizing']` | ✅ | `marginLeft`, `marginRight` | `mx:0`, `mx:[32]` |
| `my:` | `keyof Constraints['sizing']` | ✅ | `marginTop`, `marginBottom` | `my:0`, `my:[32]` |
| `ml:` | `keyof Constraints['sizing']` | ✅ | `marginLeft` | `ml:0`, `ml:[32]` |
| `mr:` | `keyof Constraints['sizing']` | ✅ | `marginRight` | `mr:0`, `mr:[32]` |
| `mt:` | `keyof Constraints['sizing']` | ✅ | `marginTop` | `mt:0`, `mt:[32]` |
| `mb:` | `keyof Constraints['sizing']` | ✅ | `marginBottom` | `mb:0`, `mb:[32]` |
| `p:` | `keyof Constraints['sizing']` | ✅ | `padding` | `p:0`, `p:[32]` |
| `px:` | `keyof Constraints['sizing']` | ✅ | `paddingLeft`, `paddingRight` | `px:0`, `px:[32]` |
| `py:` | `keyof Constraints['sizing']` | ✅ | `paddingTop`, `paddingBottom` | `py:0`, `py:[32]` |
| `pl:` | `keyof Constraints['sizing']` | ✅ | `paddingLeft` | `pl:0`, `pl:[32]` |
| `pr:` | `keyof Constraints['sizing']` | ✅ | `paddingRight` | `pr:0`, `pr:[32]` |
| `pt:` | `keyof Constraints['sizing']` | ✅ | `paddingTop` | `pt:0`, `pt:[32]` |
| `pb:` | `keyof Constraints['sizing']` | ✅ | `paddingBottom` | `pb:0`, `pb:[32]` |
| `relative` | N/A | ❌ | `{ position: "relative" }` | `relative` |
| `absolute` | N/A | ❌ | `{ position: "absolute" }` | `absolute` |
| `inset:` | `keyof Constraints['sizing']` | ✅ | `top`, `bottom`, `left`, `right` | `inset:0`, `inset:[32]` |
| `inset-x:` | `keyof Constraints['sizing']` | ✅ | `left`, `right` | `inset-x:0`, `inset-x:[32]` |
| `inset-y:` | `keyof Constraints['sizing']` | ✅ | `top`, `bottom` | `inset-y:0`, `inset-y:[32]` |
| `left:` | `keyof Constraints['sizing']` | ✅ | `left` | `left:0`, `left:[32]` |
| `right:` | `keyof Constraints['sizing']` | ✅ | `right` | `right:0`, `right:[32]` |
| `top:` | `keyof Constraints['sizing']` | ✅ | `top` | `top:0`, `top:[32]` |
| `bottom:` | `keyof Constraints['sizing']` | ✅ | `bottom` | `bottom:0`, `bottom:[32]` |
| `w:` | `keyof Constraints['sizing']` | ✅ | `width` | `w:0`, `w:[32]` |
| `min-w:` | `keyof Constraints['sizing']` | ✅ | `minWidth` | `min-w:0`, `min-w:[32]` |
| `max-w:` | `keyof Constraints['sizing']` | ✅ | `maxWidth` | `max-w:0`, `max-w:[32]` |
| `h:` | `keyof Constraints['sizing']` | ✅ | `height` | `h:0`, `h:[32]` |
| `min-h:` | `keyof Constraints['sizing']` | ✅ | `minHeight` | `min-h:0`, `min-h:[32]` |
| `max-h:` | `keyof Constraints['sizing']` | ✅ | `maxHeight` | `max-h:0`, `max-h:[32]` |
| `bg:` | `keyof Constraints['colors']` | ✅ | `backgroundColor` | `bg:red-300`, `bg:[#ff00ff]` |
| `bg-opacity:` | `keyof Constraints['opacities']` | ✅ | NA | `bg-opacity:50`, `bg-opacity:[0.32]` |
| `opacity:` | `keyof Constraints['opacities']` | ✅ | `opacity` | `opacity:50`, `opacity:[0.32]` |
| `border:` | `keyof Constraints['borderSizes']` | ✅ | `borderWidth` | `border:hairline`, `border:[3]` |
| `border-t:` | `keyof Constraints['borderSizes']` | ✅ | `borderTopWidth` | `border-t:hairline`, `border-t:[3]` |
| `border-b:` | `keyof Constraints['borderSizes']` | ✅ | `borderBottomWidth` | `border-b:hairline`, `border-b:[3]` |
| `border-l:` | `keyof Constraints['borderSizes']` | ✅ | `borderLeftWidth` | `border-l:hairline`, `border-l:[3]` |
| `border-r:` | `keyof Constraints['borderSizes']` | ✅ | `borderRightWidth` | `border-r:hairline`, `border-r:[3]` |
| `rounded:` | `keyof Constraints['borderRadii']` | ✅ | `borderRadius` | `rounded:lg`, `rounded:[3]` |
| `rounded-t:` | `keyof Constraints['borderRadii']` | ✅ | `borderTopLeftRadius`, `borderTopRightRadius` | `rounded-t:lg`, `rounded-t:[3]` |
| `rounded-b:` | `keyof Constraints['borderRadii']` | ✅ | `borderBottomLeftRadius`, `borderBottomRightRadius` | `rounded-b:lg`, `rounded-b:[3]` |
| `rounded-l:` | `keyof Constraints['borderRadii']` | ✅ | `borderBottomLeftRadius`, `borderTopLeftRadius` | `rounded-l:lg`, `rounded-l:[3]` |
| `rounded-r:` | `keyof Constraints['borderRadii']` | ✅ | `borderBottomRightRadius`, `borderTopRightRadius` | `rounded-r:lg`, `rounded-r:[3]` |
| `overflow:` | `"visible", "hidden", "scroll"` | ❌ | `overflow` | `overflow:hidden`, `overflow:scroll` |
| `justify:` | `"start", "end", "center", "between", "around", "evenly"` | ❌ | `justifyContent` | `justify:center` |
| `items:` | `"start", "end", "center", "baseline", "stretch"` | ❌ | `alignItems` | `items:center` |
| `z:` | `integer` | ❌ | `zIndex` | `z:0`, `z:10` |
| `flex:1` | N/A | ❌ | `{ flexGrow: 1, flexShrink: 1, flexBasis: "0%" }` | `flex:1` |
| `flex:auto` | N/A | ❌ | `{ flexGrow: 1, flexShrink: 1, flexBasis: "auto" }` | `flex:auto` |
| `flex:initial` | N/A | ❌ | `{ flexGrow: 0, flexShrink: 1, flexBasis: "auto" }` | `flex:initial` |
| `flex:none` | N/A | ❌ | `{ flexGrow: 0, flexShrink: 0, flexBasis: "auto" }` | `flex:none` |
| `flex:row` | N/A | ❌ | `{ flexDirection: "row" }` | `flex:row` |
| `flex:row-reverse` | N/A | ❌ | `{ flexDirection: "row" }` | `flex:row-reverse` |

TODO: `text-` classes.

## TODO:

- [ ] More tests...
- [ ] More properties...
- [ ] Clean up code...
- [ ] Memoize...
