import { createStyleBuilder } from "./createStyleBuilder";
import { defaultConstraints } from "./defaultConstraints";

const { builder } = createStyleBuilder(defaultConstraints);

builder("bg-red100", "bg-blue100");
