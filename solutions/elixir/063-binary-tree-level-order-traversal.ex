# Problem 63: Binary Tree Level Order Traversal (LeetCode 102)
# Difficulty: Med
# Language: Elixir
# 
defmodule LevelOrder do
  def level_order(nil), do: []
  def level_order(root), do: bfs([root])

  defp bfs([]), do: []
  defp bfs(level) do
    vals = Enum.map(level, fn {v, _, _} -> v end)
    next = Enum.flat_map(level, fn {_, l, r} ->
      [l, r] |> Enum.reject(&is_nil/1)
    end)
    [vals | bfs(next)]
  end
end
