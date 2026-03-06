# Problem 154: All Nodes Distance K in Binary Tree (LeetCode 863)
# Difficulty: Med
# Language: Elixir
# 
defmodule DistanceK do
  def solve(root, target, k) do
    parent_map = build_parents(root, nil, %{})
    bfs([target], 0, k, MapSet.new([target.val]), parent_map)
  end
  defp build_parents(nil, _, map), do: map
  defp build_parents(%{val: v, left: l, right: r}, parent, map) do
    map = Map.put(map, v, parent)
    map = build_parents(l, v, map)
    build_parents(r, v, map)
  end
  defp bfs(queue, dist, k, _, _) when dist == k, do: Enum.map(queue, & &1.val)
  defp bfs([], _, _, _, _), do: []
  defp bfs(queue, dist, k, visited, pm) do
    {next, visited} = Enum.reduce(queue, {[], visited}, fn node, {nxt, vis} ->
      neighbors = [node.left, node.right, pm[node.val]]
        |> Enum.reject(&(is_nil(&1) or MapSet.member?(vis, &1)))
      {nxt ++ neighbors, Enum.reduce(neighbors, vis, &MapSet.put(&2, &1))}
    end)
    bfs(next, dist + 1, k, visited, pm)
  end
end
