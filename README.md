<h1 align="center">
  <img margin="auto" src="https://turbostyles.gksander.com/img/logo.svg" alt="TurboStyles Icon" width="150px">
  <br>
  <span>React Native TurboStyles</span>
</h1>

React Native TurboStyles is a TailwindCSS-**inspired** styling library for React Native with a goal of:

- Styling ergonomics (think utility classes in CSS).
- Strongly-typed.
- Fully configurable.
- Extensive defaults out of the box.

Here's a Hello-World-esque example of using TurboStyles, to whet your appetite:

```tsx
import * as React from "react";
import { createStyleBuilder, defaultHandlers } from "react-native-turbo-styles";
import { Text, View } from "react-native";

// Create a style builder using default handlers!
const { builder: ts } = createStyleBuilder({ handlers: defaultHandlers });

export const DefaultHandlersExample: React.FC = () => {
  return (
    <View style={ts("flex:1", "justify:center", "items:center")}>
      <Text style={ts("font-weight:bold", "text:3xl", "color:purple-800")}>
        NICE!
      </Text>
    </View>
  );
};
```

## Installation

Install the library with:

```shell
# With Yarn
yarn add react-native-turbo-styles

# With NPM
npm install react-native-turbo-styles
```

There are no _hard_ requirements/dependencies for TurboStyles, but the library makes heavy use of TypeScript template literal types. These were released in TS 4.1, and **therefore for type-safety/inference to work as intended, you must be using _at least_ TS 4.1.0.**

## Library Overview

TurboStyles is built around the concept of "style handlers", which are merely functions that return style objects. The function name is used as a "classname" prefix, and the argument of function is passed as a "classname" suffix. Let's check out an example.

We can create a very basic style builder like this:

```ts
import { ViewStyle, TextStyle } from 'react-native';
import { createStyleBuilder } from 'react-native-turbo-styles';

const { builder } = createStyleBuilder({
  handlers: {
    foo: (arg: 'bar' | 'baz') => <ViewStyle>{ padding: arg === 'bar' ? 8 : 16 },
    largeText: () => <TextStyle>{ fontSize: 64 }
  }
});
```

We have two handler functions, `foo` and `largeText`. Since `foo` can take `'bar'` or `'baz'` as an argument, two associated "classnames" are available: `foo:bar` and `foo:baz`. Since `largeText` has no arguments, a single associated "classname" is available: `largeText`.

If we want to use these handlers, we just pass these "classnames" into our `builder` function:

```tsx
const style1 = builder('foo:bar'); // has type of ViewStyle
const style2 = builder('foo:baz', 'largeText'); // has type of ViewStyle & TextStyle
```

This idea is not that complicated, but it is quite powerful! You can use this concept alone to build out your own fleet of "classes". However, that can be a lot of work, so we also provide an extensive set of "default" handlers out of the box!

## Turbo Speed: Using Default Handlers

To speed up your styling journey, we provide an extensive set of default handlers - inspired largely by TailwindCSS's set of utility classes, but tailored for React Native and covering just about every square inch of React Native's styling API.

### All-In on Default Handlers

We ship a set of default handlers that you can use to get you started, if you want to use the library without any sort of customization.

```ts
import { createStyleBuilder, defaultHandlers } from 'react-native-turbo-styles';

const { builder } = createStyleBuilder({ handlers: defaultHandlers });
```

This gives you access to the entire suite of default handlers inspired by TailwindCSS's set of default theme constraints. To learn more about what "classnames" are available with the default handlers, check out the [Default Handlers In Depth](#default-handlers-in-depth) section.

### Using a Subset of Default Handlers

The `defaultHandlers` object is composed of lower-level handler objects:

```ts
export const defaultHandlers = {
  ...defaultSpacingHandlers,
  ...defaultAspectRatioHandlers,
  ...defaultBorderHandlers,
  ...defaultRoundedHandlers,
  ...defaultColorHandlers,
  ...defaultOpacityHandlers,
  ...defaultShadowHandlers,
  ...defaultPositioningHandlers,
  ...defaultFlexHandlers,
  ...defaultTypographyHandlers,
  ...defaultImageHandlers,
};
```

Each of these handler objects is available to you as well &ndash; just import it from `react-native-turbo-styles`. If you want to pick and choose which default handlers you'd like to use, you can easily do that!

```ts
import { createStyleBuilder, defaultSpacingHandlers, defaultShadowHandlers } from 'react-native-turbo-styles';

// Only using default spacing and shadow handlers.
const { builder } = createStyleBuilder({
  handlers: {
    ...defaultSpacingHandlers,
    ...defaultShadowHandlers,
  }
});
```

### Customizing Default Handlers With Your Own Constraints

Many of the default handlers operate inside a set of "constraints", and you can override those constraints to your own desire. For example, the spacing handlers have their own set of spacing/sizing constraints based on TailwindCSS's spacing scale. If you have your own sizing scale, you can generate the default spacing handlers based on that sizing scale using the `createSpacingHandlers` function. Let's explore that example.

```ts
import { createStyleBuilder, defaultHandlers, createSpacingHandlers } from 'react-native-turbo-styles';

// Only using default spacing and shadow handlers.
const { builder } = createStyleBuilder({
  handlers: {
    ...defaultHandlers,
    ...createSpacingHandlers({
      small: 2,
      medium: 8,
      big: 16,
      huge: 64
    }),
  }
});

const myStyle = builder('px:big', 'py:small', 'mb:huge');
```

To learn more about providing your own constraints to the default handlers, check out the [Default Handlers In Depth](#default-handlers-in-depth) section.

## Style Overrides

Many of the default handlers allow you to provide "override" values. For example, perhaps you need a padding of `17` put `17` isn't part of your spacing/sizing constraints &ndash; the default spacing handlers allow you to provide a _manual_ value of 17 by surrounding it in square brackets, like `p:[17]`.

In general, any default handler that allows you to provide an override will expect the manual value to be provided inside of square brackets.

TODO: Computed overrides.

## Default Handlers in Depth

TODO: write about the handler creators, constraints, etc...

## But What About Performance?

TODO: Memoization, which avoids re-renders. Don't abuse overrides...

---

## TODO:

- [ ] letterSpacing (tracking)
- [ ] lineHeight (leading)
- [ ] Text shadows?
