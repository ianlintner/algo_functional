# Problem 8: Palindrome Number (LeetCode 9)
# Difficulty: Easy
# Language: Elixir
# 
defmodule PalindromeNumber do
  def is_palindrome(x) when x < 0, do: false
  def is_palindrome(x) do
    digits = Integer.digits(x)
    digits == Enum.reverse(digits)
  end
end
