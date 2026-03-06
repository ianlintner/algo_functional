# Problem 119: Palindrome Linked List (LeetCode 234)
# Difficulty: Easy
# Language: Elixir
# 
defmodule PalindromeList do
  def is_palindrome(list), do: list == Enum.reverse(list)
end
