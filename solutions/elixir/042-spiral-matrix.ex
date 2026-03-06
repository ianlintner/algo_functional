# Problem 42: Spiral Matrix (LeetCode 54)
# Difficulty: Med
# Language: Elixir
# 
defmodule Spiral do
  def spiral_order([]), do: []
  def spiral_order([top | rest]) do
    top ++ spiral_order(rotate(rest))
  end

  defp rotate(m) do
    m
    |> Enum.zip_with(&Function.identity/1)
    |> Enum.map(&Enum.reverse/1)
  end
end
