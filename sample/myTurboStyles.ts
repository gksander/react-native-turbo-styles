import {
  createColorHandlers,
  createSpacingHandlers,
  createStyleBuilder,
  defaultHandlers,
} from "./lib";
import { TextStyle, ViewStyle } from "react-native";

const COLORS = {
  pink: "pink",
  red: "#f00",
} as const;

export const { builder: sb } = createStyleBuilder({
  handlers: defaultHandlers,
});

const myStyle = sb("text:3xl", "mb:3");
