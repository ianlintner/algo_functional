# Problem 97: Number of 1 Bits (LeetCode 191)
# Difficulty: Easy
# Language: Elixir
# 
defmodule HammingWeight do
  import Bitwise
  def count(0), do: 0
  def count(n), do: (n &&& 1) + count(n >>> 1)
end
