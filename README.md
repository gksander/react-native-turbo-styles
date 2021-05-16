<h1 align="center">
  <img margin="auto" src="https://turbostyles.gksander.com/img/logo.svg" alt="TurboStyles Icon" width="150px">
  <br>
  <span>React Native TurboStyles</span>
</h1>

<h3 align="center">
<a href="https://turbostyles.gksander.com">👉 Check out the official docs here 👈</a>
</h3>

React Native Turbo Styles is a TailwindCSS-inspired styling library for React Native with a goal of:

- Design by constraints (using theme-constraints to guide design).
- Styling ergonomics (short, nemonic "names" for styles, similar to utility classes in CSS).
- Strongly-typed.

![Example of auto-complete using TurboStyles](./static/demo.gif)

## Installation

Install the library with:

```shell
# With Yarn
yarn add react-native-turbo-styles

# With NPM
npm install react-native-turbo-styles
```

There are no _hard_ requirements/dependencies for TurboStyles, but the library makes heavy use of TypeScript template literal types. These were release in TS 4.1, and therefore for type-safety/inference to work as intended, you must be using _at least_ TS 4.1.0.

## Usage

To use the library, you create a style builder (by providing constraints) and then use the style builder to style things!

```tsx
import * as React from "react";
import { View } from "react-native";
import {
  createStyleBuilder,
  defaultConstraints,
} from "react-native-turbo-styles";

const { builder: ts } = createStyleBuilder(defaultConstraints);

const MyComponent: React.FC = () => {
  return (
    <View style={ts("flex:1", "justify:center", "items:center", "bg:blue-300")}>
      <View style={ts("w:32", "h:32", "bg:white", "shadow:lg")} />
    </View>
  );
};
```

## TODO:

- [ ] letterSpacing (tracking)
- [ ] lineHeight (leading)
- [ ] Text shadows?
