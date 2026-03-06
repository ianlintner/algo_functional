# Problem 5: Longest Palindromic Substring (LeetCode 5)
# Difficulty: Med
# Language: Elixir
# 
defmodule LongestPalindrome do
  def longest_palindrome(s) do
    chars = String.graphemes(s)
    len = length(chars)

    Enum.reduce(0..(len - 1), "", fn i, best ->
      odd  = expand(chars, i, i)
      even = expand(chars, i, i + 1)
      candidate = if String.length(odd) >= String.length(even), do: odd, else: even
      if String.length(candidate) > String.length(best), do: candidate, else: best
    end)
  end

  defp expand(chars, l, r) when l < 0 or r >= length(chars), do: ""
  defp expand(chars, l, r) do
    if Enum.at(chars, l) == Enum.at(chars, r) do
      expand(chars, l - 1, r + 1)
    else
      Enum.slice(chars, (l + 1)..(r - 1)) |> Enum.join()
    end
  end
end
