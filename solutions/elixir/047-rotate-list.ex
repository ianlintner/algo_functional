# Problem 47: Rotate List (LeetCode 61)
# Difficulty: Med
# Language: Elixir
# 
defmodule RotateList do
  def rotate_right([], _k), do: []
  def rotate_right(list, k) do
    n = length(list)
    rot = rem(k, n)
    if rot == 0, do: list,
    else: Enum.drop(list, n - rot) ++ Enum.take(list, n - rot)
  end
end
