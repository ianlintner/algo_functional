# Problem 148: Palindrome Pairs (LeetCode 336)
# Difficulty: Hard
# Language: Elixir
# 
defmodule PalindromePairs do
  def solve(words) do
    map = words |> Enum.with_index() |> Map.new()
    is_palin = fn s -> s == String.reverse(s) end
    Enum.with_index(words) |> Enum.flat_map(fn {word, i} ->
      for j <- 0..String.length(word),
          left = String.slice(word, 0, j),
          right = String.slice(word, j, String.length(word)),
          pair <- (
            a = if is_palin.(right), do:
              (case Map.get(map, String.reverse(left)) do
                k when k != nil and k != i -> [[i, k]]; _ -> [] end), else: []
            b = if j > 0 and is_palin.(left), do:
              (case Map.get(map, String.reverse(right)) do
                k when k != nil and k != i -> [[k, i]]; _ -> [] end), else: []
            a ++ b
          ), do: pair
    end)
  end
end
