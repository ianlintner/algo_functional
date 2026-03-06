# Problem 100: Number of Islands (LeetCode 200)
# Difficulty: Med
# Language: Elixir
# 
defmodule Islands do
  def count(grid) do
    rows = length(grid); cols = length(hd(grid))
    g = for {row, r} <- Enum.with_index(grid),
            {cell, c} <- Enum.with_index(row), into: %{}, do: {{r, c}, cell}
    coords = for r <- 0..(rows-1), c <- 0..(cols-1), do: {r, c}
    {cnt, _} = Enum.reduce(coords, {0, MapSet.new()}, fn {r, c}, {cnt, vis} ->
      if g[{r, c}] != "1" or MapSet.member?(vis, {r, c}), do: {cnt, vis},
      else: {cnt + 1, flood(r, c, g, vis, rows, cols)}
    end)
    cnt
  end

  defp flood(r, c, g, vis, rows, cols) do
    if r < 0 or r >= rows or c < 0 or c >= cols or
       g[{r, c}] != "1" or MapSet.member?(vis, {r, c}), do: vis,
    else:
      [{r-1,c},{r+1,c},{r,c-1},{r,c+1}]
      |> Enum.reduce(MapSet.put(vis, {r, c}), fn {nr, nc}, v ->
        flood(nr, nc, g, v, rows, cols) end)
  end
end
