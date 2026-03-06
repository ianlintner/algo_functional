# Problem 142: Bus Routes (LeetCode 815)
# Difficulty: Hard
# Language: Elixir
# 
defmodule Solution do
  def num_buses_to_destination(routes, source, target) do
    if source == target, do: 0, else: do_bfs(routes, source, target)
  end
  defp do_bfs(routes, source, target) do
    stop_map = routes |> Enum.with_index() |> Enum.reduce(%{}, fn {stops, ri}, m ->
      Enum.reduce(stops, m, fn s, m2 -> Map.update(m2, s, [ri], &[ri | &1]) end)
    end)
    bfs([source], 0, MapSet.new([source]), MapSet.new(), stop_map, routes, target)
  end
  defp bfs([], _, _, _, _, _, _), do: -1
  defp bfs(queue, buses, visited, v_routes, stop_map, routes, target) do
    if Enum.member?(queue, target), do: buses, else: (
      {next_q, visited, v_routes} = Enum.reduce(queue, {[], visited, v_routes},
        fn stop, {nq, vis, vr} ->
          ris = Map.get(stop_map, stop, []) |> Enum.reject(&MapSet.member?(vr, &1))
          vr = Enum.reduce(ris, vr, &MapSet.put(&2, &1))
          new_stops = Enum.flat_map(ris, fn ri -> Enum.at(routes, ri) end)
                      |> Enum.reject(&MapSet.member?(vis, &1))
          vis = Enum.reduce(new_stops, vis, &MapSet.put(&2, &1))
          {nq ++ new_stops, vis, vr}
        end)
      bfs(next_q, buses + 1, visited, v_routes, stop_map, routes, target)
    )
  end
end
