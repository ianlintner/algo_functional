# Problem 18: Valid Parentheses (LeetCode 20)
# Difficulty: Easy
# Language: Elixir
# 
defmodule ValidParentheses do
  def is_valid(s) do
    s
    |> String.graphemes()
    |> Enum.reduce([], fn
      ch, stk when ch in ["(", "{", "["] -> [ch | stk]
      ")", ["(" | rest] -> rest
      "]", ["[" | rest] -> rest
      "}", ["{" | rest] -> rest
      _, stk -> ["!" | stk]  # mismatch
    end)
    |> Enum.empty?()
  end
end
