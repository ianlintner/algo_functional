# Problem 137: Cheapest Flights Within K Stops (LeetCode 787)
# Difficulty: Med
# Language: Elixir
# 
defmodule Solution do
  def find_cheapest_price(n, flights, src, dst, k) do
    inf = :infinity
    init = Enum.map(0..n-1, fn i -> if i == src, do: 0, else: inf end)
    prices = Enum.reduce(1..k+1, init, fn _, prices ->
      Enum.reduce(flights, List.to_tuple(prices) |> Tuple.to_list(), fn [u, v, w], next ->
        pu = Enum.at(prices, u)
        if pu != inf and pu + w < Enum.at(next, v) do
          List.replace_at(next, v, pu + w)
        else
          next
        end
      end)
    end)
    result = Enum.at(prices, dst)
    if result == inf, do: -1, else: result
  end
end
