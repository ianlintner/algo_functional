# Problem 70: Path Sum II (LeetCode 113)
# Difficulty: Med
# Language: Elixir
# 
defmodule PathSum do
  def path_sum(nil, _), do: []
  def path_sum({v, nil, nil}, target) when v == target, do: [[v]]
  def path_sum({v, nil, nil}, _), do: []
  def path_sum({v, l, r}, target) do
    remain = target - v
    (path_sum(l, remain) ++ path_sum(r, remain))
    |> Enum.map(&[v | &1])
  end
end
