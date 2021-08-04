# Overview

- `createStyleBuilder` is greatly simplified, just takes handlers and returns a builder.
- Ship utilities that can be used to quickly create util ity functions. Like, `createSpacingHandlers(constraints)` or some shit. Can pick and choose the modules you want.
- Ship a default utility set that can be used out of the box, like TW. Maybe allow to override default constraints.
- Export all of the utilities needed to totally customize with ease.
- Also provide dark mode support...
 
## TODO:

- [] Tighten up types of `createStyleBuilder`.
- [] Spacing handlers
- [] ... rest of handlers in due time.
- [] Method to create all base styles with overrides available?

## Types of Handler helpers

- Spacing  ✅
- Aspect Ratio ✅
- Colors
- Opacity
- Positioning?
- Borders ✅
- Border Radii (corners)
- Overflow?
- Flex positioning
- z index
- Typography
- Shadows
