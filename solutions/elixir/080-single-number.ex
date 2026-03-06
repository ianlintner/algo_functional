# Problem 80: Single Number (LeetCode 136)
# Difficulty: Easy
# Language: Elixir
# 
defmodule SingleNumber do
  def single(nums) do
    Enum.reduce(nums, 0, fn n, acc -> Bitwise.bxor(acc, n) end)
  end
end
