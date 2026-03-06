# Problem 22: Swap Nodes in Pairs (LeetCode 24)
# Difficulty: Med
# Language: Elixir
# 
defmodule SwapPairs do
  def swap_pairs([]), do: []
  def swap_pairs([x]), do: [x]
  def swap_pairs([x, y | rest]), do: [y, x | swap_pairs(rest)]
end
