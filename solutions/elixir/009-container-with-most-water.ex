# Problem 9: Container With Most Water (LeetCode 11)
# Difficulty: Med
# Language: Elixir
# 
defmodule ContainerWater do
  def max_area(height) do
    arr = :array.from_list(height)
    solve(arr, 0, :array.size(arr) - 1, 0)
  end

  defp solve(_arr, l, r, best) when l >= r, do: best
  defp solve(arr, l, r, best) do
    hl = :array.get(l, arr)
    hr = :array.get(r, arr)
    area = min(hl, hr) * (r - l)
    new_best = max(best, area)
    if hl < hr,
      do: solve(arr, l + 1, r, new_best),
      else: solve(arr, l, r - 1, new_best)
  end
end
