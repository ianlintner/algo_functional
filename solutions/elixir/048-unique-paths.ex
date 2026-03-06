# Problem 48: Unique Paths (LeetCode 62)
# Difficulty: Med
# Language: Elixir
# 
defmodule UniquePaths do
  def unique_paths(m, n) do
    k = min(m - 1, n - 1)
    Enum.reduce(0..(k - 1), 1, fn i, acc ->
      div(acc * (m + n - 2 - i), i + 1)
    end)
  end
end
