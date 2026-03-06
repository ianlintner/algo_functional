# Problem 120: Lowest Common Ancestor of a Binary Search Tree (LeetCode 235)
# Difficulty: Med
# Language: Elixir
# 
defmodule LCABST do
  def lca(nil, _p, _q), do: nil
  def lca(%{val: v, left: l}, p, q) when p < v and q < v, do: lca(l, p, q)
  def lca(%{val: v, right: r}, p, q) when p > v and q > v, do: lca(r, p, q)
  def lca(%{val: v}, _p, _q), do: v
end
