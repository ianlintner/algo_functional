# Problem 36: Rotate Image (LeetCode 48)
# Difficulty: Med
# Language: Elixir
# 
defmodule RotateImage do
  def rotate(matrix) do
    matrix
    |> Enum.zip()
    |> Enum.map(&Tuple.to_list/1)
    |> Enum.map(&Enum.reverse/1)
  end
end
