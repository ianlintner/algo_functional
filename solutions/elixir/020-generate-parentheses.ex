# Problem 20: Generate Parentheses (LeetCode 22)
# Difficulty: Med
# Language: Elixir
# 
defmodule GenerateParentheses do
  def generate_parenthesis(n), do: gen(n, 0, 0, "")

  defp gen(n, _, _, current) when byte_size(current) == n * 2, do: [current]
  defp gen(n, open, close, current) do
    left  = if open < n, do: gen(n, open + 1, close, current <> "("), else: []
    right = if close < open, do: gen(n, open, close + 1, current <> ")"), else: []
    left ++ right
  end
end
