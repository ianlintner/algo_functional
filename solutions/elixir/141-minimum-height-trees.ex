# Problem 141: Minimum Height Trees (LeetCode 310)
# Difficulty: Med
# Language: Elixir
# 
defmodule Solution do
  def find_min_height_trees(1, _), do: [0]
  def find_min_height_trees(n, edges) do
    adj = Enum.reduce(edges, %{}, fn [u, v], g ->
      g |> Map.update(u, MapSet.new([v]), &MapSet.put(&1, v))
        |> Map.update(v, MapSet.new([u]), &MapSet.put(&1, u))
    end)
    leaves = adj |> Enum.filter(fn {_, s} -> MapSet.size(s) == 1 end) |> Enum.map(&elem(&1, 0))
    trim(leaves, n, adj)
  end
  defp trim(leaves, remaining, _) when remaining <= 2, do: leaves
  defp trim(leaves, remaining, adj) do
    {new_leaves, adj} = Enum.reduce(leaves, {[], adj}, fn leaf, {nl, g} ->
      nbs = MapSet.to_list(g[leaf])
      g = Enum.reduce(nbs, g, fn nb, g2 -> Map.update!(g2, nb, &MapSet.delete(&1, leaf)) end)
      new_nl = Enum.filter(nbs, fn nb -> MapSet.size(g[nb]) == 1 end)
      {nl ++ new_nl, g}
    end)
    trim(new_leaves, remaining - length(leaves), adj)
  end
end
