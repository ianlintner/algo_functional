# Problem 98: House Robber (LeetCode 198)
# Difficulty: Med
# Language: Elixir
# 
defmodule Robber do
  def rob(nums) do
    {prev1, _} = Enum.reduce(nums, {0, 0}, fn n, {p1, p2} ->
      {max(p1, p2 + n), p1}
    end)
    prev1
  end
end
