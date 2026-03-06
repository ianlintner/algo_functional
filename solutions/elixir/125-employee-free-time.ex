# Problem 125: Employee Free Time (LeetCode 759)
# Difficulty: Hard
# Language: Elixir
# 
defmodule EmployeeFreeTime do
  def free_time(schedules) do
    schedules
    |> List.flatten()
    |> Enum.sort_by(&elem(&1, 0))
    |> merge([])
    |> gaps([])
  end
  defp merge([], acc), do: Enum.reverse(acc)
  defp merge([h | t], []), do: merge(t, [h])
  defp merge([{s, e} | t], [{as_, ae} | rest]) do
    if s <= ae,
      do: merge(t, [{as_, max(ae, e)} | rest]),
      else: merge(t, [{s, e}, {as_, ae} | rest])
  end
  defp gaps([], acc), do: Enum.reverse(acc)
  defp gaps([_], acc), do: Enum.reverse(acc)
  defp gaps([{_, e1}, {s2, e2} | t], acc) do
    if e1 < s2,
      do: gaps([{s2, e2} | t], [{e1, s2} | acc]),
      else: gaps([{s2, e2} | t], acc)
  end
end
