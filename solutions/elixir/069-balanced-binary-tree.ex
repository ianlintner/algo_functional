# Problem 69: Balanced Binary Tree (LeetCode 110)
# Difficulty: Easy
# Language: Elixir
# 
defmodule Balanced do
  def balanced?(root), do: height(root) != -1

  defp height(nil), do: 0
  defp height({_, l, r}) do
    lh = height(l)
    rh = height(r)
    if lh == -1 or rh == -1 or abs(lh - rh) > 1, do: -1,
    else: 1 + max(lh, rh)
  end
end
