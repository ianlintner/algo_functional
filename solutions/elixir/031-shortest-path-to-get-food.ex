# Problem 31: Shortest Path to Get Food (LeetCode 1730)
# Difficulty: Med
# Language: Elixir
# 
defmodule ShortestFood do
  def get_food(grid) do
    rows = length(grid); cols = length(hd(grid))
    arr = grid |> Enum.with_index() |> Enum.flat_map(fn {row, i} ->
      row |> Enum.with_index() |> Enum.map(fn {c, j} -> {{i, j}, c} end)
    end) |> Map.new()

    {sr, sc} = Enum.find_value(arr, fn {{r, c}, v} -> if v == "*", do: {r, c} end)
    dirs = [{0,1},{0,-1},{1,0},{-1,0}]
    bfs([{sr, sc, 0}], MapSet.new([{sr, sc}]), arr, rows, cols, dirs)
  end

  defp bfs([], _vis, _arr, _rows, _cols, _dirs), do: -1
  defp bfs(queue, vis, arr, rows, cols, dirs) do
    {next, vis, found} = Enum.reduce(queue, {[], vis, nil}, fn
      _, {nx, vs, {:found, d}} -> {nx, vs, {:found, d}}
      {r, c, d}, {nx, vs, nil} ->
        Enum.reduce(dirs, {nx, vs, nil}, fn
          _, {nx, vs, {:found, d}} -> {nx, vs, {:found, d}}
          {dr, dc}, {nx, vs, nil} ->
            {nr, nc} = {r + dr, c + dc}
            if nr >= 0 and nr < rows and nc >= 0 and nc < cols and
               Map.get(arr, {nr, nc}) != "X" and not MapSet.member?(vs, {nr, nc}) do
              if Map.get(arr, {nr, nc}) == "#", do: {nx, vs, {:found, d + 1}},
              else: {[{nr, nc, d + 1} | nx], MapSet.put(vs, {nr, nc}), nil}
            else
              {nx, vs, nil}
            end
        end)
    end)
    case found do
      {:found, d} -> d
      nil -> bfs(Enum.reverse(next), vis, arr, rows, cols, dirs)
    end
  end
end
