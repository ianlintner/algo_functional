# Problem 19: Merge Two Sorted Lists (LeetCode 21)
# Difficulty: Easy
# Language: Elixir
# 
defmodule MergeLists do
  def merge_two_lists([], l2), do: l2
  def merge_two_lists(l1, []), do: l1
  def merge_two_lists([h1 | t1] = l1, [h2 | t2] = l2) do
    if h1 <= h2 do
      [h1 | merge_two_lists(t1, l2)]
    else
      [h2 | merge_two_lists(l1, t2)]
    end
  end
end
