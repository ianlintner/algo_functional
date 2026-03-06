# Problem 68: Task Scheduler (LeetCode 621)
# Difficulty: Med
# Language: Elixir
# 
defmodule TaskScheduler do
  def least_interval(tasks, n) do
    freqs = tasks |> Enum.frequencies() |> Map.values()
    max_freq = Enum.max(freqs)
    max_count = Enum.count(freqs, &(&1 == max_freq))
    max(length(tasks), (max_freq - 1) * (n + 1) + max_count)
  end
end
