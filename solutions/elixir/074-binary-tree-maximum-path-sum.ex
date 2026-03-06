# Problem 74: Binary Tree Maximum Path Sum (LeetCode 124)
# Difficulty: Hard
# Language: Elixir
# 
defmodule MaxPath do
  def max_path_sum(nil), do: 0
  def max_path_sum(tree), do: elem(go(tree), 1)

  defp go(nil), do: {0, -1_000_000_000}
  defp go({v, l, r}) do
    {lg, lm} = go(l)
    {rg, rm} = go(r)
    gain = max(0, v + max(lg, rg))
    path_max = Enum.max([lm, rm, v + lg + rg])
    {gain, path_max}
  end
end
