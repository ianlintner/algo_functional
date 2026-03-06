/**
 * Problem 91: Min Stack (LeetCode 155)
 * Difficulty: Med
 * Language: TypeScript
 */
// Immutable Min Stack using persistent list of (val, currentMin) pairs
type MinStack = ReadonlyArray<readonly [number, number]>;

const minStackPush = (stack: MinStack, x: number): MinStack => {
  const curMin = stack.length === 0 ? x : Math.min(x, stack[stack.length - 1][1]);
  return [...stack, [x, curMin] as const];
};
const minStackPop = (stack: MinStack): MinStack => stack.slice(0, -1);
const minStackTop = (stack: MinStack): number => stack[stack.length - 1][0];
const minStackGetMin = (stack: MinStack): number => stack[stack.length - 1][1];
