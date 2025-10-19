import { describe, it, expect } from "vitest";
import {
  add,
  divide,
  factorial,
  fibonacci,
  primeFactors,
  uniqueSorted,
  flatten,
} from "../src/utils";

describe("utils library", () => {
  it("adds two numbers (toBe)", () => {
    expect(add(2, 3)).toBe(5);
  });

  it("divides two numbers (toBe)", () => {
    expect(divide(6, 2)).toBe(3);
  });

  it("division by zero throws (toThrow)", () => {
    expect(() => divide(1, 0)).toThrow("Division by zero");
  });

  it("factorial of 5 is 120 (toBe)", () => {
    expect(factorial(5)).toBe(120);
  });

  it("factorial of negative throws (toThrow)", () => {
    expect(() => factorial(-1)).toThrow("Negative input");
  });

  it("10th fibonacci is 55 (toBe)", () => {
    expect(fibonacci(10)).toBe(55);
  });

  it("prime factors of 84 (toEqual)", () => {
    expect(primeFactors(84)).toEqual([2, 2, 3, 7]);
  });

  it("uniqueSorted returns unique sorted items (toHaveLength)", () => {
    const arr = ["b", "a", "b", "c"];
    const res = uniqueSorted(arr);
    expect(res).toHaveLength(3);
    expect(res).toEqual(["a", "b", "c"]);
  });

  it("flatten mixes arrays and values (toEqual)", () => {
    expect(flatten([1, [2, 3], 4])).toEqual([1, 2, 3, 4]);
  });

  it("prime factors contain 7 (toContain)", () => {
    expect(primeFactors(84)).toContain(7);
  });
});
