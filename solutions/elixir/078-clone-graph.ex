# Problem 78: Clone Graph (LeetCode 133)
# Difficulty: Med
# Language: Elixir
# 
defmodule CloneGraph do
  def clone(nil), do: nil
  def clone(node), do: elem(dfs(node, %{}), 0)

  defp dfs(%{val: v, neighbors: nbrs}, visited) do
    if Map.has_key?(visited, v) do
      {visited[v], visited}
    else
      clone = %{val: v, neighbors: []}
      vis = Map.put(visited, v, clone)
      {cloned_nbrs, vis2} = Enum.reduce(nbrs, {[], vis}, fn nb, {acc, vs} ->
        {cn, vs2} = dfs(nb, vs)
        {acc ++ [cn], vs2}
      end)
      result = %{clone | neighbors: cloned_nbrs}
      {result, Map.put(vis2, v, result)}
    end
  end
end
