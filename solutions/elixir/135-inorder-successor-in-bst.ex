# Problem 135: Inorder Successor in BST (LeetCode 285)
# Difficulty: Med
# Language: Elixir
# 
defmodule Solution do
  def inorder_successor(nil, _p), do: nil
  def inorder_successor(%{val: v, left: left}, p) when v > p do
    case inorder_successor(left, p) do
      nil -> v
      res -> res
    end
  end
  def inorder_successor(%{right: right}, p), do: inorder_successor(right, p)
end
