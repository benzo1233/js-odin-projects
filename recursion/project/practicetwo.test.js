const { fibonacci, mergeSort, fibRec } = require("./practicetwo");

describe("Iterative Fibonacci", () => {
  test("Fibonacci Exists", () => {
    expect(fibonacci).toBeDefined();
  });
  test("Fibonacci works for input of 1", () => {
    expect(fibonacci(1)).toBe(0);
  });
  test("Fibonacci works for input of 3", () => {
    expect(fibonacci(3)).toBe(1);
  });
  test("Fibonacci works for input of 6", () => {
    expect(fibonacci(7)).toBe(8);
  });
  test("Fibonacci works for input of 9", () => {
    expect(fibonacci(9)).toBe(21);
  });
});

describe("Recursive Fibonacci", () => {
  test("Recursive fibonacci Exists", () => {
    expect(fibRec).toBeDefined();
  });
  test("Recursive fibonacci works for input of 1", () => {
    expect(fibRec(1)).toBe(0);
  });
  test("Recursive fibonacci works for input of 3", () => {
    expect(fibRec(3)).toBe(1);
  });
  test("Recursive fibonacci works for input of 6", () => {
    expect(fibRec(7)).toBe(8);
  });
  test("Recursive fibonacci works for input of 9", () => {
    expect(fibRec(9)).toBe(21);
  });
});

describe("Merge Sort", () => {
  test("Merge sort exists", () => {
    expect(mergeSort).toBeDefined();
  });
  test("Merge sort works for empty array input", () => {
    expect(mergeSort([])).toEqual([]);
  });
  test("Merge sort works for input 3,1,2,7", () => {
    expect(mergeSort([3, 1, 2, 7])).toEqual([1, 2, 3, 7]);
  });
  test("Merge sort works 20,3,1,2,7,12", () => {
    expect(mergeSort([20, 3, 1, 2, 7, 12])).toEqual([1, 2, 3, 7, 12, 20]);
  });
});
