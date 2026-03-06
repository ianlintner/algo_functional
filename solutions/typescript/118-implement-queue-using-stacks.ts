/**
 * Problem 118: Implement Queue using Stacks (LeetCode 232)
 * Difficulty: Easy
 * Language: TypeScript
 */
type Queue<T> = { inStack: T[]; outStack: T[] };
const emptyQueue = <T>(): Queue<T> => ({ inStack: [], outStack: [] });
const enqueue = <T>(q: Queue<T>, x: T): Queue<T> =>
  ({ ...q, inStack: [...q.inStack, x] });
const transfer = <T>(q: Queue<T>): Queue<T> =>
  q.outStack.length > 0 ? q
    : { inStack: [], outStack: [...q.inStack].reverse() };
const dequeue = <T>(q: Queue<T>): [T, Queue<T>] => {
  const tq = transfer(q);
  return [tq.outStack[0], { ...tq, outStack: tq.outStack.slice(1) }];
};
const peek = <T>(q: Queue<T>): T => transfer(q).outStack[0];
