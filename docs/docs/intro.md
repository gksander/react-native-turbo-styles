---
sidebar_position: 1
---

# Introduction

React Native TurboStyles is a TailwindCSS-inspired styling library for React Native with a goal of:

- Design by constraints (using theme-constraints to guide design).
- Styling ergonomics (short, nemonic "names" for styles, similar to utility classes in CSS).
- Strongly-typed.

![Example of auto-complete using TurboStyles](/img/turbo-styles-sample.gif)

The usage model for TurboStyles is this:

- In a React Native project, install the library via `yarn` or `npm`.
- Provide a "constraints" configuration (things like sizing scale, colors, border radii, etc.). The library provides a default constraints configuration based on the default [TailwindCSS](https://tailwindcss.com/) configuration.
- The library creates a "style builder" function (and hooks) based on this constraint configuration.
- You use this "style builder" to nicely generate styles using style "names" based on your constraints.

For more details on getting started, check out [the getting started guide](./getting-started.md).
