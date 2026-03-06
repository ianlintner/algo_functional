# Problem 147: Maximum Profit in Job Scheduling (LeetCode 1235)
# Difficulty: Hard
# Language: Elixir
# 
defmodule JobScheduling do
  def max_profit(start_time, end_time, profit) do
    jobs = Enum.zip([start_time, end_time, profit])
      |> Enum.map(&Tuple.to_list/1) |> Enum.sort_by(&Enum.at(&1, 1))
    jobs |> Enum.with_index(1) |> Enum.reduce(%{0 => 0}, fn {[s, _e, p], i}, dp ->
      prev = bisect(jobs, s, i - 1)
      Map.put(dp, i, max(dp[i - 1], dp[prev] + p))
    end) |> Map.get(length(jobs))
  end
  defp bisect(_, _, 0), do: 0
  defp bisect(jobs, val, hi) do
    if Enum.at(jobs, hi - 1) |> Enum.at(1) <= val, do: hi,
    else: bisect(jobs, val, hi - 1)
  end
end
