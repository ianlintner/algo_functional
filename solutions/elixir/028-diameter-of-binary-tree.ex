# Problem 28: Diameter of Binary Tree (LeetCode 543)
# Difficulty: Easy
# Language: Elixir
# 
defmodule DiameterBT do
  def diameter(nil), do: 0
  def diameter(tree), do: elem(dfs(tree), 1)

  defp dfs(nil), do: {0, 0}
  defp dfs({_val, left, right}) do
    {lh, ld} = dfs(left)
    {rh, rd} = dfs(right)
    {1 + max(lh, rh), Enum.max([lh + rh, ld, rd])}
  end
end
