# Problem 145: Odd Even Linked List (LeetCode 328)
# Difficulty: Med
# Language: Elixir
# 
defmodule Solution do
  def odd_even_list(head), do: do_collect(head, true, [], [])
  defp do_collect(nil, _, odds, evens) do
    build(Enum.reverse(odds) ++ Enum.reverse(evens))
  end
  defp do_collect(%{val: v, next: next}, true, odds, evens) do
    do_collect(next, false, [v | odds], evens)
  end
  defp do_collect(%{val: v, next: next}, false, odds, evens) do
    do_collect(next, true, odds, [v | evens])
  end
  defp build([]), do: nil
  defp build([v | rest]), do: %{val: v, next: build(rest)}
end
