---
sidebar_position: 4
---

# Default Constraints

TurboStyles is a "bring your own constraints" library and lets you set your own design constraints. However, we provide a default constraint configuration that is modeled after the one provided by [TailwindCSS](https://tailwindcss.com/). If you want to see the default constraints, [check out the source file](https://github.com/gksander/react-native-turbo-styles/blob/main/lib/defaultConstraints.ts).

You can import the default constraints as follows:

```ts
import { defaultConstraints } from "react-native-turbo-styles";
```

Since `defaultConstraints` is just a plain ol' JavaScript object, you can override properties of it as you see fit. E.g., adding a new color:

```ts
import { createStyleBuilder, defaultConstraints } from "react-native-turbo-styles";

const { useTurboStyles } = createStyleBuilder({
  ...defaultConstraints,
  colors: {
    ...defaultConstraints.colors,
    gold: '#c4ac2a'
  }
});
```

