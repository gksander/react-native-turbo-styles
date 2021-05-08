---
sidebar_position: 1
---

# Getting Started

## Requirements

**IMPORTANT!** TurboStyles' style name inference is possible due to [template literal types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html) in TypeScript. Template literal types were released in TypeScript 4.1, and therefore for you to get type inference &ndash; your project will need to be using at least `typescript: "4.1.0"`.

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

Next, you create a "style builder" by providing constraints. The library ships with a default set of [TailwindCSS](https://tailwindcss.com/)-like constraints that you can use or extend &ndash; or you can provide your own set of constraints.

```ts
// myTurboStyles.ts
import { createStyleBuilder, defaultConstraints } from "react-native-turbo-styles";

// builder is the "style builder", we'll name as `sb` for short
export const { builder: sb } = createStyleBuilder(defaultConstraints);
```

### Styling Elements

Now that you've created a "style builder", you can use it to style elements. You pass a list of "style names", and the builder returns a style object.

```tsx
import * as React from 'react';
import { View } from 'react-native';
import { sb } from './myTurboStyles';

const MyComponent: React.FC = () => {
  return <View style={sb('flex:1', 'p:3', 'bg:red-300')} />;
}
```

That's all there is to it!

:::note
The `createStyleBuilder` function also returns a property named `constraints` that's a reference to the constraints object that you passed in.
:::
