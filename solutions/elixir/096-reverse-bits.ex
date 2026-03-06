# Problem 96: Reverse Bits (LeetCode 190)
# Difficulty: Easy
# Language: Elixir
# 
defmodule RevBits do
  def reverse_bits(n) do
    Enum.reduce(0..31, 0, fn i, acc ->
      import Bitwise
      acc ||| ((n >>> i &&& 1) <<< (31 - i))
    end)
  end
end
