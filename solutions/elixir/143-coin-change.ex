# Problem 143: Coin Change (LeetCode 322)
# Difficulty: Med
# Language: Elixir
# 
defmodule Solution do
  def coin_change(coins, amount) do
    inf = amount + 1
    dp = Enum.map(0..amount, fn 0 -> 0; _ -> inf end)
    result = Enum.reduce(coins, dp, fn coin, table ->
      Enum.map(Enum.with_index(table), fn {val, i} ->
        if i >= coin, do: min(val, Enum.at(table, i - coin) + 1), else: val
      end)
    end)
    r = Enum.at(result, amount)
    if r >= inf, do: -1, else: r
  end
end
