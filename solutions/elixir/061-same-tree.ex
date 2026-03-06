# Problem 61: Same Tree (LeetCode 100)
# Difficulty: Easy
# Language: Elixir
# 
defmodule SameTree do
  def same?(nil, nil), do: true
  def same?({v, l1, r1}, {v, l2, r2}), do: same?(l1, l2) and same?(r1, r2)
  def same?(_, _), do: false
end
