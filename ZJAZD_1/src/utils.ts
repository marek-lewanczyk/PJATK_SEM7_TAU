export function add(a: number, b: number): number {
  return a + b;
}

export function divide(a: number, b: number): number {
  if (b === 0) throw new Error("Division by zero");
  return a / b;
}

export function factorial(n: number): number {
  if (n < 0) throw new Error("Negative input");
  let res = 1;
  for (let i = 2; i <= n; i++) res *= i;
  return res;
}

export function fibonacci(n: number): number {
  if (n < 0) throw new Error("Negative input");
  if (n === 0) return 0;
  if (n === 1) return 1;
  let a = 0,
    b = 1;
  for (let i = 2; i <= n; i++) {
    const c = a + b;
    a = b;
    b = c;
  }
  return b;
}

export function primeFactors(n: number): number[] {
  const res: number[] = [];
  let num = Math.abs(Math.trunc(n));
  if (num < 2) return res;
  while (num % 2 === 0) {
    res.push(2);
    num /= 2;
  }
  let p = 3;
  while (p * p <= num) {
    while (num % p === 0) {
      res.push(p);
      num /= p;
    }
    p += 2;
  }
  if (num > 1) res.push(num);
  return res;
}

export function uniqueSorted<T>(arr: T[]): T[] {
  return Array.from(new Set(arr)).sort();
}

export function flatten<T>(arr: (T | T[])[]): T[] {
  const res: T[] = [];
  for (const v of arr) {
    if (Array.isArray(v)) {
      res.push(...v);
    } else {
      res.push(v);
    }
  }
  return res;
}
