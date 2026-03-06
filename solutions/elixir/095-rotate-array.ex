# Problem 95: Rotate Array (LeetCode 189)
# Difficulty: Med
# Language: Elixir
# 
defmodule RotateArr do
  def rotate(nums, k) do
    n = length(nums)
    s = rem(k, n)
    Enum.drop(nums, n - s) ++ Enum.take(nums, n - s)
  end
end
