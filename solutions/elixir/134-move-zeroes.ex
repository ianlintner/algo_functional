# Problem 134: Move Zeroes (LeetCode 283)
# Difficulty: Easy
# Language: Elixir
# 
defmodule Solution do
  def move_zeroes(nums) do
    {zeros, non_zeros} = Enum.split_with(nums, &(&1 == 0))
    non_zeros ++ zeros
  end
end
