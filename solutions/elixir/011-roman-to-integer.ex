# Problem 11: Roman to Integer (LeetCode 13)
# Difficulty: Easy
# Language: Elixir
# 
defmodule RomanToInteger do
  @values %{"I" => 1, "V" => 5, "X" => 10, "L" => 50,
            "C" => 100, "D" => 500, "M" => 1000}

  def roman_to_int(s) do
    s
    |> String.graphemes()
    |> Enum.reverse()
    |> Enum.reduce({0, 0}, fn ch, {total, prev} ->
      v = Map.get(@values, ch, 0)
      if v < prev, do: {total - v, v}, else: {total + v, v}
    end)
    |> elem(0)
  end
end
