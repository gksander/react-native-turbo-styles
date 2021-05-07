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

## Default Sizing Constraints

| Name | Size |
| --- | --- |
| `0` (ex: `w:0`) | 0 |
| `pt` (ex: `w:pt`) | 1 |
| `0.5` (ex: `w:0.5`) | 2 |
| `1` (ex: `w:1`) | 4 |
| `1.5` (ex: `w:1.5`) | 6 |
| `2` (ex: `w:2`) | 8 |
| `2.5` (ex: `w:2.5`) | 10 |
| `3` (ex: `w:3`) | 12 |
| `3.5` (ex: `w:3.5`) | 14 |
| `4` (ex: `w:4`) | 16 |
| `5` (ex: `w:5`) | 20 |
| `6` (ex: `w:6`) | 24 |
| `7` (ex: `w:7`) | 28 |
| `8` (ex: `w:8`) | 32 |
| `9` (ex: `w:9`) | 36 |
| `10` (ex: `w:10`) | 40 |
| `11` (ex: `w:11`) | 44 |
| `12` (ex: `w:12`) | 48 |
| `14` (ex: `w:14`) | 56 |
| `16` (ex: `w:16`) | 64 |
| `20` (ex: `w:20`) | 80 |
| `24` (ex: `w:24`) | 96 |
| `28` (ex: `w:28`) | 112 |
| `32` (ex: `w:32`) | 128 |
| `36` (ex: `w:36`) | 144 |
| `40` (ex: `w:40`) | 160 |
| `44` (ex: `w:44`) | 176 |
| `48` (ex: `w:48`) | 192 |
| `52` (ex: `w:52`) | 208 |
| `56` (ex: `w:56`) | 224 |
| `60` (ex: `w:60`) | 240 |
| `64` (ex: `w:64`) | 256 |
| `72` (ex: `w:72`) | 288 |
| `80` (ex: `w:80`) | 320 |
| `96` (ex: `w:96`) | 384 |
| `1/4` (ex: `w:1/4`) | `25%` |
| `1/2` (ex: `w:1/2`) | `50%` |
| `3/4` (ex: `w:3/4`) | `75%` |
| `1/3` (ex: `w:1/3`) | `33.33333%` |
| `2/3` (ex: `w:2/3`) | `66.66666%` |
| `1/5` (ex: `w:1/5`) | `20%` |
| `2/5` (ex: `w:2/5`) | `40%` |
| `3/5` (ex: `w:3/5`) | `60%` |
| `4/5` (ex: `w:4/5`) | `80%` |
| `full` (ex: `w:full`) | `100%` |

## Default Colors

The default colors consist of `white: #fff`, `black: #000`, and the following colors.

![Default color palette](/img/screenshots/default-colors.png)

TurboStyles exposes [the TailwindCSS color palette](https://tailwindcss.com/docs/customizing-colors#color-palette-reference) for you to use. To add more colors to the color palette, we expose a `flattenColor` utility. Usage looks something like this:

```ts
import { createStyleBuilder, defaultConstraints, flattenColor } from "./lib";

export const { builder } = createStyleBuilder({
  ...defaultConstraints,
  colors: {
    ...defaultConstraints.colors,
    ...flattenColor("lime", "lime"),
    ...flattenColor("rose", "myNameForRose")
  },
});
```

The signature for `flattenColor` is roughly this:

```ts
type FlattenColor = (key: keyof TailwindColors, name: string) => Record<string, string>;
```

## Default Opacities

Coming soon...

## Default Border Sizes

Coming soon...

## Default Border Radii

Coming soon...

## Default Font Sizes

Coming soon...

## Default Shadows

Coming soon...
