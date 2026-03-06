# Problem 167: K Closest Points to Origin (LeetCode 973)
# Difficulty: Med
# Language: Elixir
# 
defmodule KClosest do
  def k_closest(points, k) do
    points
    |> Enum.sort_by(fn [x, y] -> x * x + y * y end)
    |> Enum.take(k)
  end
end
