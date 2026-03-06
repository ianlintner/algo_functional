# Problem 87: Evaluate Reverse Polish Notation (LeetCode 150)
# Difficulty: Med
# Language: Elixir
# 
defmodule RPN do
  def eval_rpn(tokens) do
    tokens
    |> Enum.reduce([], fn
      "+", [b, a | rest] -> [a + b | rest]
      "-", [b, a | rest] -> [a - b | rest]
      "*", [b, a | rest] -> [a * b | rest]
      "/", [b, a | rest] -> [trunc(a / b) | rest]
      n, stack -> [String.to_integer(n) | stack]
    end)
    |> hd()
  end
end
