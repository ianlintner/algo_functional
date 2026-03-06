# Problem 75: Valid Palindrome (LeetCode 125)
# Difficulty: Easy
# Language: Elixir
# 
defmodule Palindrome do
  def valid?(s) do
    cleaned = s |> String.downcase() |> String.graphemes()
              |> Enum.filter(&String.match?(&1, ~r/[a-z0-9]/))
    cleaned == Enum.reverse(cleaned)
  end
end
