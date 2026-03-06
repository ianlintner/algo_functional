# Problem 49: Add Binary (LeetCode 67)
# Difficulty: Easy
# Language: Elixir
# 
defmodule AddBinary do
  def add_binary(a, b) do
    go(String.graphemes(a) |> Enum.reverse(),
       String.graphemes(b) |> Enum.reverse(), 0, [])
    |> Enum.join()
  end

  defp go([], [], 0, acc), do: acc
  defp go([], [], carry, acc), do: [Integer.to_string(carry) | acc]
  defp go(xa, xb, carry, acc) do
    {da, ra} = pop(xa)
    {db, rb} = pop(xb)
    sum = da + db + carry
    go(ra, rb, div(sum, 2), [Integer.to_string(rem(sum, 2)) | acc])
  end

  defp pop([h | t]), do: {String.to_integer(h), t}
  defp pop([]), do: {0, []}
end
