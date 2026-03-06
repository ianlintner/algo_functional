# Problem 159: Longest Palindrome (LeetCode 409)
# Difficulty: Easy
# Language: Elixir
# 
defmodule LongestPalindrome do
  def solve(s) do
    freq = String.graphemes(s) |> Enum.frequencies()
    pairs = freq |> Map.values() |> Enum.reduce(0, fn cnt, sum -> sum + div(cnt, 2) * 2 end)
    pairs + if(pairs < String.length(s), do: 1, else: 0)
  end
end
