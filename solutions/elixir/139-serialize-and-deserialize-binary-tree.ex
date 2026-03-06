# Problem 139: Serialize and Deserialize Binary Tree (LeetCode 297)
# Difficulty: Hard
# Language: Elixir
# 
defmodule Codec do
  def serialize(nil), do: "null"
  def serialize(%{val: v, left: l, right: r}) do
    "#{v},#{serialize(l)},#{serialize(r)}"
  end

  def deserialize(data) do
    tokens = String.split(data, ",")
    {tree, _} = build(tokens)
    tree
  end

  defp build(["null" | rest]), do: {nil, rest}
  defp build([val | rest]) do
    {left, r1} = build(rest)
    {right, r2} = build(r1)
    {%{val: String.to_integer(val), left: left, right: right}, r2}
  end
end
