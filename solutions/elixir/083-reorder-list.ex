# Problem 83: Reorder List (LeetCode 143)
# Difficulty: Med
# Language: Elixir
# 
defmodule ReorderList do
  def reorder(list) do
    mid = div(length(list), 2)
    {first, second} = Enum.split(list, mid)
    merge(first, Enum.reverse(second))
  end

  defp merge([], b), do: b
  defp merge(a, []), do: a
  defp merge([a | as_], [b | bs]), do: [a, b | merge(as_, bs)]
end
