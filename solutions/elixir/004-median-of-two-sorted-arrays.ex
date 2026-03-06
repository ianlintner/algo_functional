# Problem 4: Median of Two Sorted Arrays (LeetCode 4)
# Difficulty: Hard
# Language: Elixir
# 
defmodule MedianSortedArrays do
  def find_median_sorted_arrays(nums1, nums2) do
    merged = Enum.sort(nums1 ++ nums2)
    n = length(merged)
    mid = div(n, 2)
    if rem(n, 2) == 0 do
      (Enum.at(merged, mid - 1) + Enum.at(merged, mid)) / 2
    else
      Enum.at(merged, mid) * 1.0
    end
  end
end
