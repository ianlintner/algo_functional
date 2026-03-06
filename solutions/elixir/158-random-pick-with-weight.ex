# Problem 158: Random Pick with Weight (LeetCode 528)
# Difficulty: Med
# Language: Elixir
# 
defmodule WeightedPicker do
  def build(weights) do
    weights |> Enum.scan(&+/2)
  end
  def pick(prefix) do
    total = List.last(prefix)
    target = :rand.uniform(total)
    binary_search(prefix, target, 0, length(prefix) - 1)
  end
  defp binary_search(ps, target, lo, hi) when lo >= hi, do: lo
  defp binary_search(ps, target, lo, hi) do
    mid = div(lo + hi, 2)
    if Enum.at(ps, mid) < target, do: binary_search(ps, target, mid + 1, hi),
    else: binary_search(ps, target, lo, mid)
  end
end
