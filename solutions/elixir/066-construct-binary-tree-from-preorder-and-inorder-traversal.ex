# Problem 66: Construct Binary Tree from Preorder and Inorder Traversal (LeetCode 105)
# Difficulty: Med
# Language: Elixir
# 
defmodule BuildTree do
  def build([], _), do: nil
  def build([r | pre], ino) do
    {left_in, [_ | right_in]} = Enum.split_while(ino, &(&1 != r))
    n = length(left_in)
    {left_pre, right_pre} = Enum.split(pre, n)
    {r, build(left_pre, left_in), build(right_pre, right_in)}
  end
end
