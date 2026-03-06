# Problem 32: Combination Sum (LeetCode 39)
# Difficulty: Med
# Language: Elixir
# 
defmodule CombinationSum do
  def combination_sum(candidates, target) do
    candidates |> Enum.sort() |> go(target, [])
  end

  defp go(_, 0, curr), do: [Enum.reverse(curr)]
  defp go([], _, _), do: []
  defp go([c | _], rem, _) when c > rem, do: []
  defp go([c | rest] = cands, rem, curr) do
    go(cands, rem - c, [c | curr]) ++ go(rest, rem, curr)
  end
end
