---
sidebar_position: 3
---

# Available "Classes"

The core usage of TurboStyles is providing "classes" or "style names" to a style builder and passing the built style to your UI elements (like `View`).  

The table below shows all available types of "classes", which constraints (if any) apply to those "classes", and whether the type of class is [overridable](./overrides.md).

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
| `color:` | `keyof Constraints['colors']` | ✅ | `color` | `color:red-300`, `color:[#ff00ff]` |
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
| `flex:col` | N/A | ❌ | `{ flexDirection: "column" }` | `flex:col` |
| `flex:col-reverse` | N/A | ❌ | `{ flexDirection: "column-reverse" }` | `flex:col-reverse` |
| `flex:grow` | N/A | ❌ | `{ flexGrow: 1 }` | `flex:grow` |
| `flex:grow-0` | N/A | ❌ | `{ flexGrow: 0 }` | `flex:grow-0` |
| `flex:shrink` | N/A | ❌ | `{ flexShrink: 1 }` | `flex:shrink` |
| `flex:shrink-0` | N/A | ❌ | `{ flexShrink: 0 }` | `flex:shrink-0` |
| `flex:wrap` | N/A | ❌ | `{ flexWrap: "wrap" }` | `flex:wrap` |
| `flex:wrap-reverse` | N/A | ❌ | `{ flexWrap: "wrap-reverse" }` | `flex:wrap-reverse` |
| `flex:nowrap` | N/A | ❌ | `{ flexWrap: "nowrap" }` | `flex:nowrap` |
| `text:` | `keyof Constraints['fontSizes']` | ❌ | `fontSize`, `lineHeight` | `text:sm`, `text:3xl` |
| `font-weight:` | `keyof Constraints['fontWeights']` | ❌ | `fontWeight` | `font-weight:normal`, `font-weight:extrabold` |
| `italic` | N/A | ❌ | `{ fontStyle: "italic" }` | `italic` |
| `text-align:` | `auto`, `left`, `right`, `justify`, `center` | ❌ | `textAlign` | `text-align:center`, `text-align:left` |
| `uppercase` | N/A | ❌ | `{ textTransform: "uppercase" }` | `uppercase` |
| `lowercase` | N/A | ❌ | `{ textTransform: "lowercase" }` | `lowercase` |
| `capitalize` | N/A | ❌ | `{ textTransform: "capitalize" }` | `capitalize` |
| `underline` | N/A | ❌ | `{ textDecorationLine: "underline" }` | `underline` |
| `line-through` | N/A | ❌ | `{ textDecorationLine: "line-through" }` | `line-through` |
| `shadow:` | `keyof Constraints['shadows']` | ❌ | `elevation` on Android; `shadowOffset`, `shadowRadius`, `shadowOpacity` on iOS | `shadow:sm`, `shadow:lg` |

