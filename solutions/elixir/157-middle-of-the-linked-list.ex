# Problem 157: Middle of the Linked List (LeetCode 876)
# Difficulty: Easy
# Language: Elixir
# 
defmodule MiddleNode do
  def middle(nil), do: nil
  def middle(head) do
    nodes = collect(head)
    Enum.at(nodes, div(length(nodes), 2))
  end
  defp collect(nil), do: []
  defp collect(%{val: _, next: nxt} = node), do: [node | collect(nxt)]
end
