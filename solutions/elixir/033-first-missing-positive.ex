# Problem 33: First Missing Positive (LeetCode 41)
# Difficulty: Hard
# Language: Elixir
# 
defmodule FirstMissing do
  def first_missing_positive(nums) do
    s = nums |> Enum.filter(&(&1 > 0)) |> MapSet.new()
    Stream.iterate(1, &(&1 + 1)) |> Enum.find(&(not MapSet.member?(s, &1)))
  end
end
