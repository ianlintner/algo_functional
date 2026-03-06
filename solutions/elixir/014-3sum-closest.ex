# Problem 14: 3Sum Closest (LeetCode 16)
# Difficulty: Med
# Language: Elixir
# 
defmodule ThreeSumClosest do
  def three_sum_closest(nums, target) do
    sorted = Enum.sort(nums) |> :array.from_list()
    n = :array.size(sorted)

    Enum.reduce(0..(n - 3), nil, fn i, closest ->
      search(sorted, target, i, i + 1, n - 1, closest)
    end)
  end

  defp search(_arr, _target, _i, l, r, closest) when l >= r, do: closest
  defp search(arr, target, i, l, r, closest) do
    sum = :array.get(i, arr) + :array.get(l, arr) + :array.get(r, arr)
    better = if closest == nil or abs(sum - target) < abs(closest - target),
      do: sum, else: closest
    cond do
      sum < target -> search(arr, target, i, l + 1, r, better)
      sum > target -> search(arr, target, i, l, r - 1, better)
      true -> sum
    end
  end
end
