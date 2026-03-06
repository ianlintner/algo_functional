# Problem 169: Time Based Key-Value Store (LeetCode 981)
# Difficulty: Med
# Language: Elixir
# 
defmodule TimeMap do
  def new, do: %{}

  def set(tm, key, value, timestamp) do
    Map.update(tm, key, [{timestamp, value}], &[{timestamp, value} | &1])
  end

  def get(tm, key, timestamp) do
    entries = Map.get(tm, key, []) |> Enum.sort()
    bsearch(entries, timestamp, "")
  end

  defp bsearch([], _ts, acc), do: acc
  defp bsearch([{t, v} | rest], ts, acc) do
    if t <= ts, do: bsearch(rest, ts, v), else: acc
  end
end
