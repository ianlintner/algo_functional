# Problem 82: Linked List Cycle (LeetCode 141)
# Difficulty: Easy
# Language: Elixir
# 
defmodule CycleDetect do
  def has_cycle?(nil), do: false
  def has_cycle?(head), do: detect(head, next(head))

  defp detect(_, nil), do: false
  defp detect(slow, fast) when slow == fast, do: true
  defp detect(slow, fast) do
    case next(fast) do
      nil -> false
      fast2 -> detect(next(slow), next(fast2))
    end
  end

  defp next(nil), do: nil
  defp next(%{next: n}), do: n
end
