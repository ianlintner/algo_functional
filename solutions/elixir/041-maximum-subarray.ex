# Problem 41: Maximum Subarray (LeetCode 53)
# Difficulty: Med
# Language: Elixir
# 
defmodule MaxSubArray do
  def max_sub_array([h | t]) do
    {best, _} =
      Enum.reduce(t, {h, h}, fn n, {best, cur} ->
        cur = max(n, cur + n)
        {max(best, cur), cur}
      end)
    best
  end
end
