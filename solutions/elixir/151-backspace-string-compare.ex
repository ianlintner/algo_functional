# Problem 151: Backspace String Compare (LeetCode 844)
# Difficulty: Easy
# Language: Elixir
# 
defmodule BackspaceCompare do
  def compare(s, t), do: build(s) == build(t)
  defp build(str) do
    String.graphemes(str) |> Enum.reduce("", fn
      "#", acc -> String.slice(acc, 0, max(0, String.length(acc) - 1))
      ch, acc -> acc <> ch
    end)
  end
end
