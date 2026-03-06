# Problem 156: Decode String (LeetCode 394)
# Difficulty: Med
# Language: Elixir
# 
defmodule DecodeString do
  def decode(s), do: elem(helper(String.graphemes(s)), 0)
  defp helper(chars), do: helper(chars, "")
  defp helper([], acc), do: {acc, []}
  defp helper(["]" | rest], acc), do: {acc, rest}
  defp helper([c | _] = chars, acc) when c >= "0" and c <= "9" do
    {num_chars, ["[" | rest]} = Enum.split_while(chars, &(&1 >= "0" and &1 <= "9"))
    num = num_chars |> Enum.join() |> String.to_integer()
    {inner, remaining} = helper(rest)
    {next, final} = helper(remaining, "")
    {acc <> String.duplicate(inner, num) <> next, final}
  end
  defp helper([c | rest], acc), do: helper(rest, acc <> c)
end
