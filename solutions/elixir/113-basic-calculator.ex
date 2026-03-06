# Problem 113: Basic Calculator (LeetCode 224)
# Difficulty: Hard
# Language: Elixir
# 
defmodule BasicCalc do
  def calculate(s) do
    chars = s |> String.replace(" ", "") |> String.graphemes()
    {result, _} = parse(chars)
    result
  end
  defp parse(chars), do: go(chars, 0, 1)
  defp go([], result, _sign), do: {result, []}
  defp go([")" | rest], result, _sign), do: {result, rest}
  defp go(["+" | rest], result, _sign), do: go(rest, result, 1)
  defp go(["-" | rest], result, _sign), do: go(rest, result, -1)
  defp go(["(" | rest], result, sign) do
    {val, rest2} = parse(rest)
    go(rest2, result + sign * val, 1)
  end
  defp go(chars, result, sign) do
    {digits, rest} = Enum.split_while(chars, &(&1 >= "0" and &1 <= "9"))
    num = Enum.reduce(digits, 0, fn d, a -> a * 10 + String.to_integer(d) end)
    go(rest, result + sign * num, 1)
  end
end
