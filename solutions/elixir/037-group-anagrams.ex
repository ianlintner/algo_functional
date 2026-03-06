# Problem 37: Group Anagrams (LeetCode 49)
# Difficulty: Med
# Language: Elixir
# 
defmodule GroupAnagrams do
  def group_anagrams(strs) do
    strs
    |> Enum.group_by(&(String.graphemes(&1) |> Enum.sort() |> Enum.join()))
    |> Map.values()
  end
end
