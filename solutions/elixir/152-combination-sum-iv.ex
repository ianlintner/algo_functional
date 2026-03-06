# Problem 152: Combination Sum IV (LeetCode 377)
# Difficulty: Med
# Language: Elixir
# 
defmodule CombSum4 do
  def solve(nums, target) do
    dp = Enum.reduce(1..target, %{0 => 1}, fn i, dp ->
      val = Enum.reduce(nums, 0, fn n, sum ->
        if n <= i, do: sum + Map.get(dp, i - n, 0), else: sum
      end)
      Map.put(dp, i, val)
    end)
    Map.get(dp, target, 0)
  end
end
