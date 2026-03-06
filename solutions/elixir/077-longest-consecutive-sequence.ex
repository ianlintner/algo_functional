# Problem 77: Longest Consecutive Sequence (LeetCode 128)
# Difficulty: Med
# Language: Elixir
# 
defmodule LCS do
  def longest(nums) do
    set = MapSet.new(nums)
    Enum.reduce(set, 0, fn n, mx ->
      if MapSet.member?(set, n - 1), do: mx,
      else: max(mx, count_from(n, set))
    end)
  end

  defp count_from(n, set) do
    if MapSet.member?(set, n), do: 1 + count_from(n + 1, set), else: 0
  end
end
