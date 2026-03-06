# Problem 99: Binary Tree Right Side View (LeetCode 199)
# Difficulty: Med
# Language: Elixir
# 
defmodule RightView do
  def view(nil), do: []
  def view(root), do: bfs([root])

  defp bfs([]), do: []
  defp bfs(level) do
    last_val = level |> List.last() |> Map.get(:val)
    next = Enum.flat_map(level, fn n ->
      Enum.filter([n.left, n.right], & &1)
    end)
    [last_val | bfs(next)]
  end
end
