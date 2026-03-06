# Problem 52: Search a 2D Matrix (LeetCode 74)
# Difficulty: Med
# Language: Elixir
# 
defmodule Search2DMatrix do
  def search_matrix(matrix, target) do
    flat = List.flatten(matrix)
    bin_search(flat, target, 0, length(flat) - 1)
  end

  defp bin_search(_flat, _target, lo, hi) when lo > hi, do: false
  defp bin_search(flat, target, lo, hi) do
    mid = div(lo + hi, 2)
    v = Enum.at(flat, mid)
    cond do
      v == target -> true
      v < target -> bin_search(flat, target, mid + 1, hi)
      true -> bin_search(flat, target, lo, mid - 1)
    end
  end
end
