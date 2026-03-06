# Problem 128: Graph Valid Tree (LeetCode 261)
# Difficulty: Med
# Language: Elixir
# 
defmodule ValidTree do
  def valid_tree(n, edges) do
    if length(edges) != n - 1, do: false,
    else: (
      adj = Enum.reduce(edges, %{}, fn [u, v], g ->
        g |> Map.update(u, [v], &[v | &1])
          |> Map.update(v, [u], &[u | &1])
      end)
      visited = dfs(0, MapSet.new(), adj)
      MapSet.size(visited) == n
    )
  end
  defp dfs(node, visited, adj) do
    if MapSet.member?(visited, node), do: visited,
    else: (
      visited = MapSet.put(visited, node)
      Map.get(adj, node, [])
      |> Enum.reduce(visited, fn nb, acc -> dfs(nb, acc, adj) end)
    )
  end
end
