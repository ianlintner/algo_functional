# Problem 34: Trapping Rain Water (LeetCode 42)
# Difficulty: Hard
# Language: Elixir
# 
defmodule TrappingWater do
  def trap(height) do
    max_left = Enum.scan(height, &max/2)
    max_right = height |> Enum.reverse() |> Enum.scan(&max/2) |> Enum.reverse()
    Enum.zip([height, max_left, max_right])
    |> Enum.map(fn {h, l, r} -> max(0, min(l, r) - h) end)
    |> Enum.sum()
  end
end
