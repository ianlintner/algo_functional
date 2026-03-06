# Problem 35: Permutations (LeetCode 46)
# Difficulty: Med
# Language: Elixir
# 
defmodule Permutations do
  def permute([]), do: [[]]
  def permute(nums) do
    Enum.flat_map(Enum.with_index(nums), fn {n, i} ->
      rest = List.delete_at(nums, i)
      Enum.map(permute(rest), fn p -> [n | p] end)
    end)
  end
end
