# Problem 90: Find Minimum in Rotated Sorted Array (LeetCode 153)
# Difficulty: Med
# Language: Elixir
# 
defmodule FindMin do
  def find_min(nums) do
    arr = :array.from_list(nums)
    go(arr, 0, :array.size(arr) - 1)
  end

  defp go(arr, lo, lo), do: :array.get(lo, arr)
  defp go(arr, lo, hi) do
    mid = div(lo + hi, 2)
    if :array.get(mid, arr) > :array.get(hi, arr),
      do: go(arr, mid + 1, hi),
      else: go(arr, lo, mid)
  end
end
