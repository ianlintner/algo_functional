# Problem 50: Climbing Stairs (LeetCode 70)
# Difficulty: Easy
# Language: Elixir
# 
defmodule ClimbStairs do
  def climb_stairs(n) do
    {result, _} = Enum.reduce(1..n, {1, 1}, fn _, {a, b} -> {b, a + b} end)
    result
  end
end
