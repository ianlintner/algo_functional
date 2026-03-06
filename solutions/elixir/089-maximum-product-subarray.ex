# Problem 89: Maximum Product Subarray (LeetCode 152)
# Difficulty: Med
# Language: Elixir
# 
defmodule MaxProd do
  def max_product([h | t]) do
    {best, _, _} = Enum.reduce(t, {h, h, h}, fn n, {best, mx, mn} ->
      candidates = [n, mx * n, mn * n]
      hi = Enum.max(candidates)
      lo = Enum.min(candidates)
      {max(best, hi), hi, lo}
    end)
    best
  end
end
