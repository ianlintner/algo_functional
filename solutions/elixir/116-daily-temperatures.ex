# Problem 116: Daily Temperatures (LeetCode 739)
# Difficulty: Med
# Language: Elixir
# 
defmodule DailyTemps do
  def daily_temperatures(temps) do
    temps
    |> Enum.with_index()
    |> List.foldr({[], %{}}, fn {t, i}, {stack, res} ->
      stack = Enum.drop_while(stack, fn {_, st} -> st <= t end)
      val = case stack do
        [] -> 0
        [{j, _} | _] -> j - i
      end
      {[{i, t} | stack], Map.put(res, i, val)}
    end)
    |> elem(1)
    |> Enum.sort_by(&elem(&1, 0))
    |> Enum.map(&elem(&1, 1))
  end
end
