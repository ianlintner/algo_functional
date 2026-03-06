# Problem 168: Squares of a Sorted Array (LeetCode 977)
# Difficulty: Easy
# Language: Elixir
# 
defmodule SortedSquares do
  def sorted_squares(nums) do
    merge(nums, Enum.reverse(nums), []) |> Enum.reverse() |> Enum.take(length(nums))
  end

  def sorted_squares_simple(nums) do
    nums |> Enum.map(&(&1 * &1)) |> Enum.sort()
  end

  defp merge([], _, acc), do: acc
  defp merge(_, [], acc), do: acc
  defp merge([l | lr], [r | rr], acc) do
    if abs(l) >= abs(r),
      do: merge(lr, [r | rr], [l * l | acc]),
      else: merge([l | lr], rr, [r * r | acc])
  end
end
