# Problem 105: Course Schedule II (LeetCode 210)
# Difficulty: Med
# Language: Elixir
# 
defmodule CourseOrder do
  def find_order(n, prereqs) do
    graph = Enum.reduce(prereqs, %{}, fn [a, b], g ->
      Map.update(g, b, [a], &[a | &1]) end)
    init = %{path: MapSet.new(), done: MapSet.new(), order: [], cycle: false}
    result = Enum.reduce(0..(n-1), init, &dfs(&1, graph, &2))
    if result.cycle, do: [], else: result.order
  end
  defp dfs(v, graph, s) do
    cond do
      s.cycle or MapSet.member?(s.done, v) -> s
      MapSet.member?(s.path, v) -> %{s | cycle: true}
      true ->
        s1 = %{s | path: MapSet.put(s.path, v)}
        s2 = Enum.reduce(Map.get(graph, v, []), s1, &dfs(&1, graph, &2))
        %{s2 | done: MapSet.put(s2.done, v), order: s2.order ++ [v]}
    end
  end
end
