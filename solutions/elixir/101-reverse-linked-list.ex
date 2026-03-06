# Problem 101: Reverse Linked List (LeetCode 206)
# Difficulty: Easy
# Language: Elixir
# 
defmodule ReverseList do
  def reverse(list), do: Enum.reduce(list, [], &[&1 | &2])
  # For linked list nodes:
  # def reverse(nil, acc), do: acc
  # def reverse({v, next}, acc), do: reverse(next, {v, acc})
end
