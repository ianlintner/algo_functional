# Problem 73: Best Time to Buy and Sell Stock (LeetCode 121)
# Difficulty: Easy
# Language: Elixir
# 
defmodule Stock do
  def max_profit([]), do: 0
  def max_profit([h | t]) do
    {_, profit} = Enum.reduce(t, {h, 0}, fn price, {mn, mx} ->
      {min(mn, price), max(mx, price - mn)}
    end)
    profit
  end
end
