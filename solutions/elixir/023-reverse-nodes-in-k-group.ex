# Problem 23: Reverse Nodes in k-Group (LeetCode 25)
# Difficulty: Hard
# Language: Elixir
# 
defmodule ReverseKGroup do
  def reverse_k_group(list, k) do
    {group, rest} = Enum.split(list, k)
    if length(group) < k do
      list
    else
      Enum.reverse(group) ++ reverse_k_group(rest, k)
    end
  end
end
