# Problem 13: 3Sum (LeetCode 15)
# Difficulty: Med
# Language: Elixir
# 
defmodule ThreeSum do
  def three_sum(nums) do
    sorted = Enum.sort(nums)
    sorted
    |> Enum.with_index()
    |> Enum.reduce([], fn {num, i}, acc ->
      if i > 0 and num == Enum.at(sorted, i - 1), do: acc,
      else: acc ++ two_sum(sorted, -num, i + 1, length(sorted) - 1)
    end)
  end

  defp two_sum(arr, target, l, r) when l >= r, do: []
  defp two_sum(arr, target, l, r) do
    sum = Enum.at(arr, l) + Enum.at(arr, r)
    cond do
      sum < target -> two_sum(arr, target, l + 1, r)
      sum > target -> two_sum(arr, target, l, r - 1)
      true ->
        [[- target, Enum.at(arr, l), Enum.at(arr, r)] |
         two_sum(arr, target, next_l(arr, l), r - 1)]
    end
  end

  defp next_l(arr, l) do
    if Enum.at(arr, l) == Enum.at(arr, l + 1), do: next_l(arr, l + 1), else: l + 1
  end
end
