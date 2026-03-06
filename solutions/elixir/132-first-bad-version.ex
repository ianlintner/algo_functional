# Problem 132: First Bad Version (LeetCode 278)
# Difficulty: Easy
# Language: Elixir
# 
defmodule Solution do
  def first_bad_version(n, is_bad) do
    search(1, n, is_bad)
  end
  defp search(lo, hi, _) when lo >= hi, do: lo
  defp search(lo, hi, is_bad) do
    mid = lo + div(hi - lo, 2)
    if is_bad.(mid), do: search(lo, mid, is_bad), else: search(mid + 1, hi, is_bad)
  end
end
