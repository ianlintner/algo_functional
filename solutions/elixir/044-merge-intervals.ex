# Problem 44: Merge Intervals (LeetCode 56)
# Difficulty: Med
# Language: Elixir
# 
defmodule MergeIntervals do
  def merge(intervals) do
    intervals
    |> Enum.sort_by(&elem(&1, 0))
    |> Enum.reduce([], fn {s, e}, acc ->
      case acc do
        [{ps, pe} | rest] when s <= pe ->
          [{ps, max(pe, e)} | rest]
        _ -> [{s, e} | acc]
      end
    end)
    |> Enum.reverse()
  end
end
