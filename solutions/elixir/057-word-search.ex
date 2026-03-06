# Problem 57: Word Search (LeetCode 79)
# Difficulty: Med
# Language: Elixir
# 
defmodule WordSearch do
  def exist(board, word) do
    chars = String.graphemes(word)
    rows = length(board); cols = length(hd(board))
    coords = for r <- 0..(rows-1), c <- 0..(cols-1), do: {r, c}
    Enum.any?(coords, fn {r, c} -> dfs(board, chars, r, c, 0, MapSet.new(), rows, cols) end)
  end

  defp dfs(_, chars, _, _, i, _, _, _) when i == length(chars), do: true
  defp dfs(board, chars, r, c, i, vis, rows, cols) do
    cond do
      r < 0 or r >= rows or c < 0 or c >= cols -> false
      MapSet.member?(vis, {r, c}) -> false
      Enum.at(Enum.at(board, r), c) != Enum.at(chars, i) -> false
      true ->
        vis = MapSet.put(vis, {r, c})
        Enum.any?([{1,0},{-1,0},{0,1},{0,-1}], fn {dr,dc} ->
          dfs(board, chars, r+dr, c+dc, i+1, vis, rows, cols)
        end)
    end
  end
end
