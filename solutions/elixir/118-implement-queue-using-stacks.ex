# Problem 118: Implement Queue using Stacks (LeetCode 232)
# Difficulty: Easy
# Language: Elixir
# 
defmodule FQueue do
  defstruct instack: [], outstack: []
  def new, do: %FQueue{}
  def enqueue(%FQueue{instack: ins} = q, x), do: %{q | instack: [x | ins]}
  def dequeue(%FQueue{outstack: [h | t]} = q), do: {h, %{q | outstack: t}}
  def dequeue(%FQueue{instack: ins, outstack: []}),
    do: dequeue(%FQueue{instack: [], outstack: Enum.reverse(ins)})
  def peek(q), do: elem(dequeue(q), 0)
end
