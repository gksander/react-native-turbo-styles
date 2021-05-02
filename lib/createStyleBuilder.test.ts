import { createStyleBuilder } from "./createStyleBuilder";

describe("createStyleBuilder", () => {
  it("creates a one-dimensional style", () => {
    const { builder } = createStyleBuilder({
      m: {
        __propertiesToSet: ["margin"],
        foo: 8,
      },
      p: {
        __propertiesToSet: ["padding"],
        bar: "10%",
      },
    });

    expect(builder("m-foo")).toEqual({ margin: 8 });
    expect(builder("p-bar")).toEqual({ padding: "10%" });
    expect(builder("m-foo", "p-bar")).toEqual({ margin: 8, padding: "10%" });
  });

  it("overwrites styles in order passed", () => {
    const { builder } = createStyleBuilder({
      m: {
        __propertiesToSet: ["margin"],
        1: 1,
        2: 2,
      },
    });

    expect(builder("m-1", "m-2")).toEqual({ margin: 2 });
    expect(builder("m-2", "m-1")).toEqual({ margin: 1 });
  });

  it("sets multiple properties with a single value", () => {
    const { builder } = createStyleBuilder({
      mx: {
        __propertiesToSet: ["marginLeft", "marginRight"],
        foo: 8,
      },
    });

    expect(builder("mx-foo")).toEqual({ marginLeft: 8, marginRight: 8 });
  });

  it("--bg-opacity to set background opacity", () => {
    const { builder } = createStyleBuilder({
      bg: {
        __propertiesToSet: ["backgroundColor"],
        red: "#f00",
      },
      "bg-opacity": {
        __propertiesToSet: ["--bg-opacity"],
        50: 0.5,
      },
    });

    expect(builder("bg-red", "bg-opacity-50")).toEqual({
      backgroundColor: "rgba(255, 0, 0, 0.5)",
    });
  });

  it("should set multiple properties if multiple values provided", () => {
    const { builder } = createStyleBuilder({
      mx: {
        __propertiesToSet: ["marginLeft", "marginRight"],
        base: 8,
        uneven: [4, 12],
      },
    });

    expect(builder("mx-base")).toEqual({ marginLeft: 8, marginRight: 8 });
    expect(builder("mx-uneven")).toEqual({ marginLeft: 4, marginRight: 12 });
  });

  it("allows single override values", () => {
    const { builder } = createStyleBuilder({
      m: {
        __propertiesToSet: ["margin"],
        base: 8,
      },
      mx: {
        __propertiesToSet: ["marginLeft", "marginRight"],
        base: 5,
      },
    });

    expect(builder("m-[32]")).toEqual({ margin: 32 });
    expect(builder("m-[10%]")).toEqual({ margin: "10%" });
    expect(builder("mx-[5]")).toEqual({ marginLeft: 5, marginRight: 5 });
  });

  it("allows multiple override values", () => {
    const { builder } = createStyleBuilder({
      mx: {
        __propertiesToSet: ["marginLeft", "marginRight"],
        base: 8,
      },
    });

    expect(builder("mx-[4,12]")).toEqual({ marginLeft: 4, marginRight: 12 });
  });

  // TODO: Handle rgb values for colors...
});
