# Problem 40: Subarray Sum Equals K (LeetCode 560)
# Difficulty: Med
# Language: Elixir
# 
defmodule SubarraySum do
  def subarray_sum(nums, k) do
    {count, _, _} =
      Enum.reduce(nums, {0, 0, %{0 => 1}}, fn n, {count, sum, map} ->
        s = sum + n
        c = count + Map.get(map, s - k, 0)
        m = Map.update(map, s, 1, &(&1 + 1))
        {c, s, m}
      end)
    count
  end
end
