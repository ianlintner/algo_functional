# Problem 51: Set Matrix Zeroes (LeetCode 73)
# Difficulty: Med
# Language: Elixir
# 
defmodule SetMatrixZeroes do
  def set_zeroes(matrix) do
    rows = for {row, i} <- Enum.with_index(matrix), 0 in row, do: i
    cols = for j <- 0..(length(hd(matrix)) - 1),
               Enum.any?(matrix, &(Enum.at(&1, j) == 0)), do: j
    row_set = MapSet.new(rows)
    col_set = MapSet.new(cols)
    Enum.with_index(matrix)
    |> Enum.map(fn {row, i} ->
      Enum.with_index(row)
      |> Enum.map(fn {v, j} ->
        if i in row_set or j in col_set, do: 0, else: v
      end)
    end)
  end
end
