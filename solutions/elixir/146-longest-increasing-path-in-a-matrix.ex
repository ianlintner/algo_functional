# Problem 146: Longest Increasing Path in a Matrix (LeetCode 329)
# Difficulty: Hard
# Language: Elixir
# 
defmodule LIP do
  def longest_increasing_path(matrix) do
    rows = length(matrix); cols = length(hd(matrix))
    grid = for {row, r} <- Enum.with_index(matrix), {val, c} <- Enum.with_index(row),
               into: %{}, do: {{r, c}, val}
    {memo, _} = Enum.reduce(for(r <- 0..rows-1, c <- 0..cols-1, do: {r,c}), {%{}, grid},
      fn pos, {memo, g} -> dfs(pos, g, memo, rows, cols) end)
    memo |> Map.values() |> Enum.max()
  end
  defp dfs({r,c}, grid, memo, rows, cols) do
    if Map.has_key?(memo, {r,c}), do: {memo, grid},
    else: (
      val = grid[{r,c}]
      {memo2, best} = Enum.reduce([{0,1},{0,-1},{1,0},{-1,0}], {memo, 0},
        fn {dr,dc}, {m, mx} ->
          nr = r+dr; nc = c+dc
          if nr >= 0 and nr < rows and nc >= 0 and nc < cols and grid[{nr,nc}] > val do
            {m2, _} = dfs({nr,nc}, grid, m, rows, cols)
            {m2, max(mx, m2[{nr,nc}])}
          else {m, mx} end
        end)
      {Map.put(memo2, {r,c}, best + 1), grid}
    )
  end
end
