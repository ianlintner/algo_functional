# Problem 1: Two Sum (LeetCode 1)
# Difficulty: Easy
# Language: Elixir
# 
defmodule TwoSum do
  def two_sum(nums, target) do
    nums
    |> Enum.with_index()
    |> Enum.reduce_while(%{}, fn {num, i}, map ->
      complement = target - num
      case Map.get(map, complement) do
        nil -> {:cont, Map.put(map, num, i)}
        j   -> {:halt, [j, i]}
      end
    end)
  end
end
