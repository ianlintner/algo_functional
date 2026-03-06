# Problem 62: Symmetric Tree (LeetCode 101)
# Difficulty: Easy
# Language: Elixir
# 
defmodule Symmetric do
  def symmetric?(nil), do: true
  def symmetric?({_, l, r}), do: mirror?(l, r)

  defp mirror?(nil, nil), do: true
  defp mirror?({v, l1, r1}, {v, l2, r2}), do: mirror?(l1, r2) and mirror?(r1, l2)
  defp mirror?(_, _), do: false
end
