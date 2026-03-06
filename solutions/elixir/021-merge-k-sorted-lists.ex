# Problem 21: Merge k Sorted Lists (LeetCode 23)
# Difficulty: Hard
# Language: Elixir
# 
defmodule MergeKLists do
  def merge_k_lists(lists) do
    Enum.reduce(lists, [], &merge/2)
  end

  defp merge([], l2), do: l2
  defp merge(l1, []), do: l1
  defp merge([h1 | t1] = l1, [h2 | t2] = l2) do
    if h1 <= h2,
      do: [h1 | merge(t1, l2)],
      else: [h2 | merge(l1, t2)]
  end
end
