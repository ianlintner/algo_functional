# Problem 79: Gas Station (LeetCode 134)
# Difficulty: Med
# Language: Elixir
# 
defmodule GasStation do
  def can_complete(gas, cost) do
    diffs = Enum.zip(gas, cost) |> Enum.map(fn {g, c} -> g - c end)
    {total, _, start} = diffs |> Enum.with_index()
      |> Enum.reduce({0, 0, 0}, fn {d, i}, {tot, tank, s} ->
        tot2 = tot + d; tank2 = tank + d
        if tank2 < 0, do: {tot2, 0, i + 1}, else: {tot2, tank2, s}
      end)
    if total >= 0, do: start, else: -1
  end
end
