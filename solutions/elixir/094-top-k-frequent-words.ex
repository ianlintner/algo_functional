# Problem 94: Top K Frequent Words (LeetCode 692)
# Difficulty: Med
# Language: Elixir
# 
defmodule TopKWords do
  def top_k(words, k) do
    words
    |> Enum.frequencies()
    |> Enum.sort_by(fn {w, c} -> {-c, w} end)
    |> Enum.take(k)
    |> Enum.map(&elem(&1, 0))
  end
end
