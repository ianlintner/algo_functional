# Problem 29: Valid Sudoku (LeetCode 36)
# Difficulty: Med
# Language: Elixir
# 
defmodule ValidSudoku do
  def is_valid?(board) do
    entries =
      for {row, i} <- Enum.with_index(board),
          {cell, j} <- Enum.with_index(row),
          cell != ".",
          do: {i, j, cell}

    keys =
      Enum.flat_map(entries, fn {i, j, c} ->
        ["r#{i}:#{c}", "c#{j}:#{c}",
         "b#{div(i,3)},#{div(j,3)}:#{c}"]
      end)

    length(keys) == MapSet.size(MapSet.new(keys))
  end
end
