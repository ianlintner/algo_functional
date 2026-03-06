# Problem 149: Counting Bits (LeetCode 338)
# Difficulty: Easy
# Language: Elixir
# 
defmodule CountBits do
  def count_bits(n) do
    Enum.reduce(0..n, %{}, fn i, dp ->
      Map.put(dp, i, if(i == 0, do: 0, else: dp[div(i, 2)] + rem(i, 2)))
    end) |> Enum.sort() |> Enum.map(&elem(&1, 1))
  end
end
