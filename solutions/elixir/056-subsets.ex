# Problem 56: Subsets (LeetCode 78)
# Difficulty: Med
# Language: Elixir
# 
defmodule Subsets do
  def subsets([]), do: [[]]
  def subsets([h | t]) do
    rest = subsets(t)
    rest ++ Enum.map(rest, &[h | &1])
  end
end
