# Problem 91: Min Stack (LeetCode 155)
# Difficulty: Med
# Language: Elixir
# 
defmodule MinStack do
  def new, do: []

  def push([], x), do: [{x, x}]
  def push([{_, m} | _] = s, x), do: [{x, min(x, m)} | s]

  def pop([_ | rest]), do: rest
  def top([{v, _} | _]), do: v
  def get_min([{_, m} | _]), do: m
end
