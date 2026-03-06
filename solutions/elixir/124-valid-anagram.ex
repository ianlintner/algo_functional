# Problem 124: Valid Anagram (LeetCode 242)
# Difficulty: Easy
# Language: Elixir
# 
defmodule Anagram do
  def is_anagram(s, t) do
    freq = fn str ->
      str |> String.graphemes() |> Enum.frequencies()
    end
    freq.(s) == freq.(t)
  end
end
