# Problem 6: Reverse Integer (LeetCode 7)
# Difficulty: Med
# Language: Elixir
# 
defmodule ReverseInteger do
  def reverse(x) do
    sign = if x < 0, do: -1, else: 1
    reversed =
      abs(x)
      |> Integer.digits()
      |> Enum.reverse()
      |> Integer.undigits()
      |> Kernel.*(sign)

    max_int = :math.pow(2, 31) |> trunc() |> Kernel.-(1)
    min_int = -(:math.pow(2, 31) |> trunc())
    if reversed > max_int or reversed < min_int, do: 0, else: reversed
  end
end
