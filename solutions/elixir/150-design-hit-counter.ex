# Problem 150: Design Hit Counter (LeetCode 362)
# Difficulty: Med
# Language: Elixir
# 
defmodule HitCounter do
  def new_counter(), do: []
  def hit(counter, timestamp), do: counter ++ [timestamp]
  def get_hits(counter, timestamp) do
    filtered = Enum.filter(counter, &(&1 > timestamp - 300))
    {length(filtered), filtered}
  end
end
