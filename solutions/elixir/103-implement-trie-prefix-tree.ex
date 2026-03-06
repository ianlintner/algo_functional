# Problem 103: Implement Trie (Prefix Tree) (LeetCode 208)
# Difficulty: Med
# Language: Elixir
# 
defmodule Trie do
  def new, do: %{ch: %{}, end: false}
  def insert(node, <<>>), do: %{node | end: true}
  def insert(node, <<c, rest::binary>>) do
    child = Map.get(node.ch, c, new())
    %{node | ch: Map.put(node.ch, c, insert(child, rest))}
  end
  def search(%{end: e}, <<>>), do: e
  def search(%{ch: ch}, <<c, rest::binary>>),
    do: if Map.has_key?(ch, c), do: search(ch[c], rest), else: false
  def starts_with(_, <<>>), do: true
  def starts_with(%{ch: ch}, <<c, rest::binary>>),
    do: if Map.has_key?(ch, c), do: starts_with(ch[c], rest), else: false
end
