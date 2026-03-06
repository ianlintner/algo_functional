# Problem 85: Find K Closest Elements (LeetCode 658)
# Difficulty: Med
# Language: Elixir
# 
defmodule ClosestK do
  def find(arr, k, x) do
    vec = :array.from_list(arr)
    go(0, :array.size(vec), k, x, vec)
  end

  defp go(lo, hi, k, _, vec) when hi - lo == k do
    Enum.map(lo..(hi-1), &:array.get(&1, vec))
  end
  defp go(lo, hi, k, x, vec) do
    if abs(:array.get(lo, vec) - x) <= abs(:array.get(hi - 1, vec) - x),
      do: go(lo, hi - 1, k, x, vec),
      else: go(lo + 1, hi, k, x, vec)
  end
end
