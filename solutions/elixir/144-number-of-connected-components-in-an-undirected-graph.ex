# Problem 144: Number of Connected Components in an Undirected Graph (LeetCode 323)
# Difficulty: Med
# Language: Elixir
# 
defmodule Solution do
  def count_components(n, edges) do
    parent = Enum.into(0..n-1, %{}, fn i -> {i, i} end)
    {_parent, count} = Enum.reduce(edges, {parent, n}, fn [u, v], {p, cnt} ->
      {ru, p} = find(p, u)
      {rv, p} = find(p, v)
      if ru == rv, do: {p, cnt}, else: {Map.put(p, ru, rv), cnt - 1}
    end)
    count
  end
  defp find(p, x) do
    if p[x] == x, do: {x, p}, else: (
      {root, p} = find(p, p[x])
      {root, Map.put(p, x, root)}
    )
  end
end
