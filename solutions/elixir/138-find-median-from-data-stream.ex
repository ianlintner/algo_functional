# Problem 138: Find Median from Data Stream (LeetCode 295)
# Difficulty: Hard
# Language: Elixir
# 
defmodule MedianFinder do
  defstruct lo: [], hi: []

  def new, do: %MedianFinder{}

  def add_num(%MedianFinder{lo: lo, hi: hi} = _mf, num) do
    {lo, hi} = if lo == [] or num <= List.last(lo),
      do: {Enum.sort([ num | lo]), hi},
      else: {lo, insert_sorted(hi, num)}
    balance(lo, hi)
  end

  defp insert_sorted([], v), do: [v]
  defp insert_sorted([h | t], v) when v <= h, do: [v, h | t]
  defp insert_sorted([h | t], v), do: [h | insert_sorted(t, v)]

  defp balance(lo, hi) when length(lo) > length(hi) + 1 do
    %MedianFinder{lo: Enum.drop(lo, -1), hi: [List.last(lo) | hi]}
  end
  defp balance(lo, hi) when length(hi) > length(lo) do
    %MedianFinder{lo: lo ++ [hd(hi)], hi: tl(hi)}
  end
  defp balance(lo, hi), do: %MedianFinder{lo: lo, hi: hi}

  def find_median(%MedianFinder{lo: lo, hi: hi}) do
    if length(lo) > length(hi), do: List.last(lo),
    else: (List.last(lo) + hd(hi)) / 2
  end
end
