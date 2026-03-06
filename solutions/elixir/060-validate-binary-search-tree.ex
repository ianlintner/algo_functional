# Problem 60: Validate Binary Search Tree (LeetCode 98)
# Difficulty: Med
# Language: Elixir
# 
defmodule BST do
  def valid?(nil, _, _), do: true
  def valid?({val, left, right}, lo, hi) do
    val > lo and val < hi and
    valid?(left, lo, val) and
    valid?(right, val, hi)
  end
  def is_valid_bst(root), do: valid?(root, :neg_inf, :pos_inf)
end
