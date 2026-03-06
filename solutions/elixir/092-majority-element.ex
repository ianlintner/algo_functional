# Problem 92: Majority Element (LeetCode 169)
# Difficulty: Easy
# Language: Elixir
# 
defmodule Majority do
  def element(nums) do
    {cand, _} = Enum.reduce(nums, {0, 0}, fn
      n, {_, 0} -> {n, 1}
      n, {c, k} -> if n == c, do: {c, k + 1}, else: {c, k - 1}
    end)
    cand
  end
end
