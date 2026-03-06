# Problem 38: Pow(x, n) (LeetCode 50)
# Difficulty: Med
# Language: Elixir
# 
defmodule MyPow do
  def my_pow(_, 0), do: 1.0
  def my_pow(x, n) when n < 0, do: my_pow(1.0 / x, -n)
  def my_pow(x, n) when rem(n, 2) == 0, do: my_pow(x * x, div(n, 2))
  def my_pow(x, n), do: x * my_pow(x * x, div(n, 2))
end
