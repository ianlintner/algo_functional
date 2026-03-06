# Problem 64: Binary Tree Zigzag Level Order Traversal (LeetCode 103)
# Difficulty: Med
# Language: Elixir
# 
defmodule Zigzag do
  def zigzag(nil), do: []
  def zigzag(root), do: bfs([root], 0)

  defp bfs([], _), do: []
  defp bfs(level, n) do
    vals = Enum.map(level, fn {v, _, _} -> v end)
    row = if rem(n, 2) == 0, do: vals, else: Enum.reverse(vals)
    next = Enum.flat_map(level, fn {_, l, r} ->
      [l, r] |> Enum.reject(&is_nil/1)
    end)
    [row | bfs(next, n + 1)]
  end
end
