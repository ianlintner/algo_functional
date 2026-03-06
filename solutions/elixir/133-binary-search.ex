# Problem 133: Binary Search (LeetCode 704)
# Difficulty: Easy
# Language: Elixir
# 
defmodule Solution do
  def binary_search(nums, target) do
    arr = :array.from_list(nums)
    search(arr, target, 0, :array.size(arr) - 1)
  end
  defp search(_, _, lo, hi) when lo > hi, do: -1
  defp search(arr, target, lo, hi) do
    mid = lo + div(hi - lo, 2)
    val = :array.get(mid, arr)
    cond do
      val == target -> mid
      val < target  -> search(arr, target, mid + 1, hi)
      true          -> search(arr, target, lo, mid - 1)
    end
  end
end
