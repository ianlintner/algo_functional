# Problem 7: String to Integer (atoi) (LeetCode 8)
# Difficulty: Med
# Language: Elixir
# 
defmodule MyAtoi do
  def my_atoi(s) do
    trimmed = String.trim_leading(s)
    {sign, rest} = case trimmed do
      "-" <> r -> {-1, r}
      "+" <> r -> {1, r}
      r        -> {1, r}
    end

    digits =
      rest
      |> String.graphemes()
      |> Enum.reduce_while([], fn ch, acc ->
        if ch >= "0" and ch <= "9",
          do: {:cont, acc ++ [String.to_integer(ch)]},
          else: {:halt, acc}
      end)

    value = Enum.reduce(digits, 0, fn d, acc -> acc * 10 + d end)
    result = sign * value
    max_int = trunc(:math.pow(2, 31)) - 1
    min_int = -trunc(:math.pow(2, 31))
    max(min_int, min(max_int, result))
  end
end
