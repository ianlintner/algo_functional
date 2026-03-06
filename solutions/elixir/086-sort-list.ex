# Problem 86: Sort List (LeetCode 148)
# Difficulty: Med
# Language: Elixir
# 
defmodule SortList do
  def sort([]), do: []
  def sort([x]), do: [x]
  def sort(list) do
    {l, r} = Enum.split(list, div(length(list), 2))
    merge(sort(l), sort(r))
  end

  defp merge([], b), do: b
  defp merge(a, []), do: a
  defp merge([a | as_], [b | bs]) when a <= b, do: [a | merge(as_, [b | bs])]
  defp merge(a, [b | bs]), do: [b | merge(a, bs)]
end
