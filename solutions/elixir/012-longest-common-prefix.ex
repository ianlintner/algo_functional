# Problem 12: Longest Common Prefix (LeetCode 14)
# Difficulty: Easy
# Language: Elixir
# 
defmodule LongestCommonPrefix do
  def longest_common_prefix([]), do: ""
  def longest_common_prefix(strs) do
    strs
    |> Enum.reduce(fn str, prefix ->
      prefix
      |> String.graphemes()
      |> Enum.zip(String.graphemes(str))
      |> Enum.take_while(fn {a, b} -> a == b end)
      |> Enum.map(&elem(&1, 0))
      |> Enum.join()
    end)
  end
end
