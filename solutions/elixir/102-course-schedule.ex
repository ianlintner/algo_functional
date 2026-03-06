# Problem 102: Course Schedule (LeetCode 207)
# Difficulty: Med
# Language: Elixir
# 
defmodule CourseSchedule do
  def can_finish(n, prereqs) do
    graph = Enum.reduce(prereqs, %{}, fn [a, b], g ->
      Map.update(g, b, [a], &[a | &1])
    end)
    {cycle, _} = Enum.reduce(0..(n-1), {false, {MapSet.new(), MapSet.new()}},
      fn _, {true, s} -> {true, s}
         i, {false, s} -> dfs(i, graph, s) end)
    not cycle
  end
  defp dfs(v, graph, {path, done}) do
    cond do
      MapSet.member?(done, v) -> {false, {path, done}}
      MapSet.member?(path, v) -> {true, {path, done}}
      true ->
        {cyc, {p, d}} = Enum.reduce(Map.get(graph, v, []),
          {false, {MapSet.put(path, v), done}},
          fn _, {true, s} -> {true, s}
             nb, {false, s} -> dfs(nb, graph, s) end)
        {cyc, {p, MapSet.put(d, v)}}
    end
  end
end
