# Problem 108: Kth Largest Element in an Array (LeetCode 215)
# Difficulty: Med
# Language: Elixir
# 
defmodule KthLargest do
  def find(nums, k) do
    pivot = Enum.at(nums, div(length(nums), 2))
    hi = Enum.filter(nums, &(&1 > pivot))
    eq = Enum.filter(nums, &(&1 == pivot))
    lo = Enum.filter(nums, &(&1 < pivot))
    cond do
      k <= length(hi) -> find(hi, k)
      k <= length(hi) + length(eq) -> pivot
      true -> find(lo, k - length(hi) - length(eq))
    end
  end
end
