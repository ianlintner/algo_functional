# Problem 45: Insert Interval (LeetCode 57)
# Difficulty: Med
# Language: Elixir
# 
defmodule InsertInterval do
  def insert(intervals, new_interval) do
    [new_interval | intervals]
    |> Enum.sort_by(&elem(&1, 0))
    |> Enum.reduce([], fn {s, e}, acc ->
      case acc do
        [{ps, pe} | rest] when s <= pe -> [{ps, max(pe, e)} | rest]
        _ -> [{s, e} | acc]
      end
    end)
    |> Enum.reverse()
  end
end
