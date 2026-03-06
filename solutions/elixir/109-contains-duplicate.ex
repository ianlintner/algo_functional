# Problem 109: Contains Duplicate (LeetCode 217)
# Difficulty: Easy
# Language: Elixir
# 
defmodule ContainsDup do
  def check(nums) do
    Enum.reduce_while(nums, MapSet.new(), fn n, seen ->
      if MapSet.member?(seen, n), do: {:halt, true},
      else: {:cont, MapSet.put(seen, n)}
    end) == true
  end
end
