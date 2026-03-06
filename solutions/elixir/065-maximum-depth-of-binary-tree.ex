# Problem 65: Maximum Depth of Binary Tree (LeetCode 104)
# Difficulty: Easy
# Language: Elixir
# 
defmodule MaxDepth do
  def max_depth(nil), do: 0
  def max_depth({_, l, r}), do: 1 + max(max_depth(l), max_depth(r))
end
