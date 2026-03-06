# Problem 26: Longest Valid Parentheses (LeetCode 32)
# Difficulty: Hard
# Language: Elixir
# 
defmodule LongestValidParentheses do
  def longest_valid_parentheses(s) do
    chars = String.graphemes(s)
    max(scan(chars, "(", ")"), scan(Enum.reverse(chars), ")", "("))
  end

  defp scan(chars, open, close) do
    {_, _, mx} =
      Enum.reduce(chars, {0, 0, 0}, fn c, {l, r, mx} ->
        {l, r} = if c == open, do: {l + 1, r}, else: {l, r + 1}
        cond do
          r > l -> {0, 0, mx}
          l == r -> {l, r, max(mx, 2 * r)}
          true -> {l, r, mx}
        end
      end)
    mx
  end
end
