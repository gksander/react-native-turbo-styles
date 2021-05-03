import { createStyleBuilder } from "./createStyleBuilder";
import { defaultConstraints } from "./defaultConstraints";

const { builder } = createStyleBuilder(defaultConstraints);

builder("bg:red-100");
