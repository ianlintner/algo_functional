# Problem 114: Invert Binary Tree (LeetCode 226)
# Difficulty: Easy
# Language: Elixir
# 
defmodule InvertTree do
  def invert(nil), do: nil
  def invert({val, left, right}),
    do: {val, invert(right), invert(left)}
end
