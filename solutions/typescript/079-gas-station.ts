/**
 * Problem 79: Gas Station (LeetCode 134)
 * Difficulty: Med
 * Language: TypeScript
 */
function canCompleteCircuit(gas: number[], cost: number[]): number {
  const diffs = gas.map((g, i) => g - cost[i]);
  const result = diffs.reduce(
    (acc, d, i) => {
      const total = acc.total + d;
      const tank = acc.tank + d;
      return tank < 0
        ? { total, tank: 0, start: i + 1 }
        : { total, tank, start: acc.start };
    },
    { total: 0, tank: 0, start: 0 }
  );
  return result.total >= 0 ? result.start : -1;
}
