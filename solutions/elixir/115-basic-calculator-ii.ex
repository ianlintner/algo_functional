# Problem 115: Basic Calculator II (LeetCode 227)
# Difficulty: Med
# Language: Elixir
# 
defmodule BasicCalc2 do
  def calculate(s) do
    chars = s |> String.replace(" ", "") |> String.graphemes()
    {stack, _} = parse(chars, [], "+")
    Enum.sum(stack)
  end
  defp parse([], stack, _op), do: {stack, []}
  defp parse(chars, stack, op) do
    {digits, rest} = Enum.split_while(chars, &(&1 >= "0" and &1 <= "9"))
    n = Enum.join(digits) |> String.to_integer()
    new_stack = case op do
      "*" -> List.update_at(stack, -1, &(&1 * n))
      "/" -> List.update_at(stack, -1, &div(&1, n))
      "-" -> stack ++ [-n]
      _ -> stack ++ [n]
    end
    case rest do
      [] -> {new_stack, []}
      [c | rest2] -> parse(rest2, new_stack, c)
    end
  end
end
