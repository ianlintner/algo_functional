/**
 * Problem 112: Asteroid Collision (LeetCode 735)
 * Difficulty: Med
 * Language: TypeScript
 */
function asteroidCollision(asteroids: number[]): number[] {
  return asteroids.reduce<number[]>((stack, ast) => {
    const resolve = (s: number[], a: number): number[] => {
      if (s.length === 0 || a > 0 || s[s.length - 1] < 0) return [...s, a];
      if (s[s.length - 1] === -a) return s.slice(0, -1);
      if (s[s.length - 1] < -a) return resolve(s.slice(0, -1), a);
      return s;
    };
    return resolve(stack, ast);
  }, []);
}
