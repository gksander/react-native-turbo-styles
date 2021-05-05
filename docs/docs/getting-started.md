---
sidebar_position: 2
---

# Getting Started

## Requirements

**IMPORTANT!** TurboStyles' style name inference is possible due to [template literal types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html) in TypeScript. Template literal types were released in TypeScript 4.1, and therefore for you to get type inference - your project will need to be using at least `typescript: "4.1.0"`.

## Usage

Aside from the TypeScript requirements mentioned above, TurboStyles has no additional requirements or dependencies. Therefore, installation and usage is straight-forward.

### Installation

Install TurboStyles with `yarn` or `npm`:

```shell
# Yarn
yarn add react-native-turbo-styles

# Or NPM
npm i react-native-turbo-styles
```

### Create Style Builder with Constraints

Next, you create a "style builder" by providing constraints. The library ships with a default set of [TailwindCSS](https://tailwindcss.com/)-like constraints that you can use or extend - or you can provide your own set of constraints.

```ts
// myTurboStyles.ts
import { createStyleBuilder, defaultConstraints } from "react-native-turbo-styles";

// builder is the "style builder".
// useTurboStyles is just a hook for accessing the builder.
export const { builder, useTurboStyles } = createStyleBuilder(defaultConstraints);
```

### Styling Elements

Now that you've created a "style builder", you can use it to style elements. You pass a list of "style names", and the builder returns a style object.

```tsx
import * as React from 'react';
import { View } from 'react-native';
import { useTurboStyles } from './myTurboStyles';

const MyComponent: React.FC = () => {
  const ts = useTurboStyles();
  
  return <View style={ts('flex:1', 'p:3', 'bg:red-300')} />;
}
```

That's all there is to it!

### Use the Style Builder Directly

The `createStyleBuilder` function returns (amongst other things) a `builder` function and a `useTurboStyles` hook.

The previous example used the `useTurboStyles` hook -- but you might opt to use the builder directly. To do so, just export the `builder` function that is returned from `createStyleBuilder` and call it directly. This might look like the following:

```tsx
// In myTurboStyles.ts
import { createStyleBuilder, defaultConstraints } from "react-native-turbo-styles";
export const { builder: ts, useTurboStyles } = createStyleBuilder(defaultConstraints);

// In MyComponent.tsx
import * as React from 'react';
import { View } from 'react-native';
import { ts } from './myTurboStyles';

const MyComponent: React.FC = () => {
	return <View style={ts('flex:1', 'p:3', 'bg:red-300')} />;
}
```
