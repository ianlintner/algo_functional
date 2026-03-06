# Problem 121: Lowest Common Ancestor of a Binary Tree (LeetCode 236)
# Difficulty: Med
# Language: Elixir
# 
defmodule LCA do
  def lca(nil, _p, _q), do: nil
  def lca(%{val: v} = node, p, q) when v == p or v == q, do: node
  def lca(%{left: l, right: r} = node, p, q) do
    left = lca(l, p, q)
    right = lca(r, p, q)
    cond do
      left != nil and right != nil -> node
      left != nil -> left
      true -> right
    end
  end
end
