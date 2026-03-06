# Problem 67: Convert Sorted Array to Binary Search Tree (LeetCode 108)
# Difficulty: Easy
# Language: Elixir
# 
defmodule SortedToBST do
  def to_bst([]), do: nil
  def to_bst(nums) do
    mid = div(length(nums), 2)
    {left, [v | right]} = Enum.split(nums, mid)
    {v, to_bst(left), to_bst(right)}
  end
end
