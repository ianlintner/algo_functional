# Problem 17: Remove Nth Node From End of List (LeetCode 19)
# Difficulty: Med
# Language: Elixir
# 
defmodule RemoveNth do
  def remove_nth_from_end(list, n) do
    len = length(list)
    idx = len - n
    list
    |> Enum.with_index()
    |> Enum.reject(fn {_, i} -> i == idx end)
    |> Enum.map(&elem(&1, 0))
  end
end
