# Problem 2: Add Two Numbers (LeetCode 2)
# Difficulty: Med
# Language: Elixir
# 
defmodule AddTwoNumbers do
  def add_two_numbers(l1, l2), do: add(l1, l2, 0, [])

  defp add([], [], 0, acc), do: Enum.reverse(acc)
  defp add(l1, l2, carry, acc) do
    v1 = List.first(l1) || 0
    v2 = List.first(l2) || 0
    sum = v1 + v2 + carry
    add(tl_or_empty(l1), tl_or_empty(l2), div(sum, 10), [rem(sum, 10) | acc])
  end

  defp tl_or_empty([]), do: []
  defp tl_or_empty([_|t]), do: t
end
