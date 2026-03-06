# Problem 129: Missing Number (LeetCode 268)
# Difficulty: Easy
# Language: Elixir
# 
defmodule MissingNumber do
  import Bitwise
  def missing(nums) do
    n = length(nums)
    xor_nums = Enum.reduce(nums, 0, &bxor/2)
    xor_all = Enum.reduce(0..n, 0, &bxor/2)
    bxor(xor_nums, xor_all)
  end
end
