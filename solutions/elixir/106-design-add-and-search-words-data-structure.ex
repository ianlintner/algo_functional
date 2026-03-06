# Problem 106: Design Add and Search Words Data Structure (LeetCode 211)
# Difficulty: Med
# Language: Elixir
# 
defmodule WordDict do
  def new, do: %{ch: %{}, end: false}
  def add(node, <<>>), do: %{node | end: true}
  def add(node, <<c, rest::binary>>) do
    child = Map.get(node.ch, c, new())
    %{node | ch: Map.put(node.ch, c, add(child, rest))}
  end
  def search(node, <<>>), do: node.end
  def search(node, <<?., rest::binary>>),
    do: Enum.any?(Map.values(node.ch), &search(&1, rest))
  def search(node, <<c, rest::binary>>),
    do: if Map.has_key?(node.ch, c), do: search(node.ch[c], rest), else: false
end
