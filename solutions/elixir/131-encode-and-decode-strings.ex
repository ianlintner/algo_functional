# Problem 131: Encode and Decode Strings (LeetCode 271)
# Difficulty: Med
# Language: Elixir
# 
defmodule Codec do
  def encode(strs) do
    Enum.reduce(strs, "", fn s, acc ->
      acc <> Integer.to_string(String.length(s)) <> "#" <> s
    end)
  end
  def decode(s), do: do_decode(s, [])
  defp do_decode("", acc), do: Enum.reverse(acc)
  defp do_decode(s, acc) do
    {num_str, "#" <> rest} = Integer.parse(s)
    {word, remaining} = String.split_at(rest, num_str)
    do_decode(remaining, [word | acc])
  end
end
