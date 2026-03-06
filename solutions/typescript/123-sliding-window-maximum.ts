/**
 * Problem 123: Sliding Window Maximum (LeetCode 239)
 * Difficulty: Hard
 * Language: TypeScript
 */
function maxSlidingWindow(nums: number[], k: number): number[] {
  const clean = (dq: number[], i: number): number[] => {
    const d1 = dq.length > 0 && dq[0] <= i - k ? dq.slice(1) : dq;
    const popBack = (d: number[]): number[] =>
      d.length > 0 && nums[d[d.length - 1]] <= nums[i]
        ? popBack(d.slice(0, -1)) : d;
    return [...popBack(d1), i];
  };
  return nums.reduce<{ dq: number[]; res: number[] }>(
    (acc, _, i) => {
      const dq = clean(acc.dq, i);
      return { dq, res: i >= k - 1 ? [...acc.res, nums[dq[0]]] : acc.res };
    }, { dq: [], res: [] }
  ).res;
}
