# Problem 25: Next Permutation (LeetCode 31)
# Difficulty: Med
# Language: Elixir
# 
defmodule NextPermutation do
  def next_permutation(nums) do
    n = length(nums)
    arr = :array.from_list(nums)
    i = find_i(arr, n - 2)
    if i < 0 do
      Enum.reverse(nums)
    else
      j = find_j(arr, n - 1, :array.get(i, arr))
      swapped = swap(arr, i, j)
      prefix = for k <- 0..i, do: :array.get(k, swapped)
      suffix = for k <- (i+1)..(n-1), do: :array.get(k, swapped)
      prefix ++ Enum.reverse(suffix)
    end
  end

  defp find_i(_arr, i) when i < 0, do: -1
  defp find_i(arr, i) do
    if :array.get(i, arr) < :array.get(i + 1, arr), do: i, else: find_i(arr, i - 1)
  end

  defp find_j(arr, j, val) do
    if :array.get(j, arr) > val, do: j, else: find_j(arr, j - 1, val)
  end

  defp swap(arr, i, j) do
    vi = :array.get(i, arr)
    vj = :array.get(j, arr)
    arr |> :array.set(i, vj) |> :array.set(j, vi)
  end
end
