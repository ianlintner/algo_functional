# Problem 161: Pacific Atlantic Water Flow (LeetCode 417)
# Difficulty: Med
# Language: Elixir
# 
defmodule PacificAtlantic do
  def solve(heights) do
    rows = length(heights); cols = length(hd(heights))
    get = fn r, c -> Enum.at(heights, r) |> Enum.at(c) end
    dfs = fn dfs_fn, visited, {r, c} ->
      if MapSet.member?(visited, {r, c}), do: visited,
      else: (
        visited = MapSet.put(visited, {r, c})
        [{1,0},{-1,0},{0,1},{0,-1}]
        |> Enum.reduce(visited, fn {dr, dc}, acc ->
          nr = r + dr; nc = c + dc
          if nr >= 0 and nr < rows and nc >= 0 and nc < cols
             and not MapSet.member?(acc, {nr, nc})
             and get.(nr, nc) >= get.(r, c),
            do: dfs_fn.(dfs_fn, acc, {nr, nc}), else: acc
        end)
      )
    end
    pac_starts = for(r <- 0..(rows-1), do: {r, 0}) ++ for(c <- 0..(cols-1), do: {0, c})
    atl_starts = for(r <- 0..(rows-1), do: {r, cols-1}) ++ for(c <- 0..(cols-1), do: {rows-1, c})
    pac = Enum.reduce(pac_starts, MapSet.new(), &dfs.(dfs, &2, &1))
    atl = Enum.reduce(atl_starts, MapSet.new(), &dfs.(dfs, &2, &1))
    MapSet.intersection(pac, atl) |> MapSet.to_list()
  end
end
