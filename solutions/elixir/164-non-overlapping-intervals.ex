# Problem 164: Non-overlapping Intervals (LeetCode 435)
# Difficulty: Med
# Language: Elixir
# 
defmodule NonOverlap do
  def erase_overlap_intervals(intervals) do
    intervals
    |> Enum.sort_by(&elem(&1, 1))
    |> Enum.reduce({0, -1_000_000_000}, fn [s, e], {count, last_end} ->
      if s < last_end, do: {count + 1, last_end}, else: {count, e}
    end)
    |> elem(0)
  end
end
