declare type NonSymbol<T> = T extends number | string | symbol ? Exclude<T, symbol> : T;
declare type ValueOf<T> = T[keyof T];
/**
 * Style builder
 */
export declare const createStyleBuilder: <C extends {
    [key: string]: {
        [key: string]: any;
        __defaultPropertiesToSet?: ("backfaceVisibility" | "backgroundColor" | "borderBottomColor" | "borderBottomEndRadius" | "borderBottomLeftRadius" | "borderBottomRightRadius" | "borderBottomStartRadius" | "borderBottomWidth" | "borderColor" | "borderEndColor" | "borderLeftColor" | "borderLeftWidth" | "borderRadius" | "borderRightColor" | "borderRightWidth" | "borderStartColor" | "borderStyle" | "borderTopColor" | "borderTopEndRadius" | "borderTopLeftRadius" | "borderTopRightRadius" | "borderTopStartRadius" | "borderTopWidth" | "borderWidth" | "opacity" | "testID" | "elevation" | "alignContent" | "alignItems" | "alignSelf" | "aspectRatio" | "borderEndWidth" | "borderStartWidth" | "bottom" | "display" | "end" | "flex" | "flexBasis" | "flexDirection" | "flexGrow" | "flexShrink" | "flexWrap" | "height" | "justifyContent" | "left" | "margin" | "marginBottom" | "marginEnd" | "marginHorizontal" | "marginLeft" | "marginRight" | "marginStart" | "marginTop" | "marginVertical" | "maxHeight" | "maxWidth" | "minHeight" | "minWidth" | "overflow" | "padding" | "paddingBottom" | "paddingEnd" | "paddingHorizontal" | "paddingLeft" | "paddingRight" | "paddingStart" | "paddingTop" | "paddingVertical" | "position" | "right" | "start" | "top" | "width" | "zIndex" | "direction" | "shadowColor" | "shadowOffset" | "shadowOpacity" | "shadowRadius" | "transform" | "transformMatrix" | "rotation" | "scaleX" | "scaleY" | "translateX" | "translateY" | "color" | "fontFamily" | "fontSize" | "fontStyle" | "fontWeight" | "letterSpacing" | "lineHeight" | "textAlign" | "textDecorationLine" | "textDecorationStyle" | "textDecorationColor" | "textShadowColor" | "textShadowOffset" | "textShadowRadius" | "textTransform" | "fontVariant" | "writingDirection" | "textAlignVertical" | "includeFontPadding" | "resizeMode" | "overlayColor" | "tintColor" | "--bg-opacity")[] | undefined;
    };
}, P extends { [key in keyof C]: `${NonSymbol<key>}-${NonSymbol<Exclude<keyof C[key], "__defaultPropertiesToSet">>}` | `${NonSymbol<key>}-[${string}]`; }>(config: C) => {
    builder: (...args: ValueOf<P>[]) => Record<string | number, any>;
    config: C;
};
export {};
