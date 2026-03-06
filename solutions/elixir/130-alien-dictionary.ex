# Problem 130: Alien Dictionary (LeetCode 269)
# Difficulty: Hard
# Language: Elixir
# 
defmodule AlienDict do
  def alien_order(words) do
    chars = words |> Enum.join() |> String.graphemes() |> MapSet.new()
    edges = words |> Enum.chunk_every(2, 1, :discard)
            |> Enum.flat_map(&find_edge/1)
    graph = Enum.reduce(edges, Map.new(chars, fn c -> {c, MapSet.new()} end),
      fn {u, v}, g -> Map.update(g, u, MapSet.new([v]), &MapSet.put(&1, v)) end)
    in_deg = Enum.reduce(edges, Map.new(chars, fn c -> {c, 0} end),
      fn {_u, v}, m -> Map.update(m, v, 1, &(&1 + 1)) end)
    start = in_deg |> Enum.filter(fn {_, d} -> d == 0 end) |> Enum.map(&elem(&1, 0))
    topo(start, [], graph, in_deg, MapSet.size(chars))
  end
  defp find_edge([w1, w2]) do
    Enum.zip(String.graphemes(w1), String.graphemes(w2))
    |> Enum.find(fn {a, b} -> a != b end)
    |> case do nil -> []; {a, b} -> [{a, b}] end
  end
  defp topo([], res, _, _, n), do: if length(res) == n, do: Enum.join(res), else: ""
  defp topo([c | rest], res, graph, in_deg, n) do
    nbs = Map.get(graph, c, MapSet.new()) |> MapSet.to_list()
    {in_deg, new_q} = Enum.reduce(nbs, {in_deg, rest}, fn nb, {d, q} ->
      d = Map.update!(d, nb, &(&1 - 1))
      if d[nb] == 0, do: {d, q ++ [nb]}, else: {d, q}
    end)
    topo(new_q, res ++ [c], graph, in_deg, n)
  end
end
