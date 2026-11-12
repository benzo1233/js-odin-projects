import {
  capitalize,
  reverseString,
  calc,
  caesarCiphor,
  analyzeArray,
} from "./index.js";

describe("capitalize", () => {
  test("capitalize func exists", () => {
    expect(capitalize).toBeDefined();
  });
  test("func returns string", () => {
    expect(capitalize("Hi")).toBe("Hi");
  });
  test("func returns capitalized letter of string", () => {
    expect(capitalize("str")).toBe("Str");
  });
});

describe("reverseString", () => {
  test("reverseString func exists", () => {
    expect(reverseString).toBeDefined();
  });
  test("reverses string input", () => {
    expect(reverseString("str")).toBe("rts");
  });
  test("reverses diff string input", () => {
    expect(reverseString("string1")).toBe("1gnirts");
  });
});

describe("calculator", () => {
  test("calculator exists", () => {
    expect(calc).toBeDefined();
  });
  test("add works", () => {
    expect(calc.add(1, 2)).toBe(3);
  });
  test("sub works", () => {
    expect(calc.sub(2, 1)).toBe(1);
  });
  test("multi works", () => {
    expect(calc.multi(2, 3)).toBe(6);
  });
  test("divid works", () => {
    expect(calc.divid(6, 3)).toBe(2);
  });
});

describe("caesarCiphor", () => {
  test("caesarCiphor exists", () => {
    expect(caesarCiphor).toBeDefined();
  });
  test("caesarCiphor works", () => {
    expect(caesarCiphor("xyz", 3)).toBe("abc");
  });
  test("caesarCiphor works for capitalized letters", () => {
    expect(caesarCiphor("HeLLo", 3)).toBe("KhOOr");
  });
  test("caesarCiphor works for non-letters", () => {
    expect(caesarCiphor("Hello, World!", 3)).toBe("Khoor, Zruog!");
  });
});

describe("analyze array", () => {
  test("analyze array exists", () => {
    expect(analyzeArray).toBeDefined();
  });
  test("analyze avg works", () => {
    expect(analyzeArray([1, 8, 3, 4, 2, 6]).average).toBe(4);
  });
  test("analyze min works", () => {
    expect(analyzeArray([1, 8, 3, 4, 2, 6]).min).toBe(1);
  });
  test("analyze max works", () => {
    expect(analyzeArray([1, 8, 3, 4, 2, 6]).max).toBe(8);
  });
  test("analyze length works", () => {
    expect(analyzeArray([1, 8, 3, 4, 2, 6]).length).toBe(6);
  });
  test("analyze returns entire object w/ correct properties", () => {
    expect(analyzeArray([1, 8, 3, 4, 2, 6])).toEqual({
      average: 4,
      min: 1,
      max: 8,
      length: 6,
    });
  });
});
