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

## Available Properties

TODO: Fill this in...

## Default Constraints

TODO: Fill this in...

## TODO:

- [ ] Documentation
- [ ] Finish writing tests
- [ ] Memoize...
