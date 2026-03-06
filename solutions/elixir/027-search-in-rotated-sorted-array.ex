# Problem 27: Search in Rotated Sorted Array (LeetCode 33)
# Difficulty: Med
# Language: Elixir
# 
defmodule SearchRotated do
  def search(nums, target) do
    arr = :array.from_list(nums)
    go(arr, target, 0, :array.size(arr) - 1)
  end

  defp go(_arr, _target, lo, hi) when lo > hi, do: -1
  defp go(arr, target, lo, hi) do
    mid = div(lo + hi, 2)
    mid_val = :array.get(mid, arr)
    lo_val = :array.get(lo, arr)
    hi_val = :array.get(hi, arr)
    cond do
      mid_val == target -> mid
      lo_val <= mid_val ->
        if target >= lo_val and target < mid_val,
          do: go(arr, target, lo, mid - 1),
          else: go(arr, target, mid + 1, hi)
      true ->
        if target > mid_val and target <= hi_val,
          do: go(arr, target, mid + 1, hi),
          else: go(arr, target, lo, mid - 1)
    end
  end
end
