# Problem 3: Longest Substring Without Repeating Characters (LeetCode 3)
# Difficulty: Med
# Language: Elixir
# 
defmodule LongestSubstring do
  def length_of_longest_substring(s) do
    s
    |> String.graphemes()
    |> Enum.with_index()
    |> Enum.reduce({0, %{}, 0}, fn {char, i}, {left, seen, best} ->
      new_left = case Map.get(seen, char) do
        nil -> left
        j   -> max(left, j + 1)
      end
      {new_left, Map.put(seen, char, i), max(best, i - new_left + 1)}
    end)
    |> elem(2)
  end
end
