# Problem 136: Find the Duplicate Number (LeetCode 287)
# Difficulty: Med
# Language: Elixir
# 
defmodule Solution do
  def find_duplicate(nums) do
    arr = :array.from_list([0 | nums])
    step = fn i -> :array.get(i, arr) end
    meet = find_meet(step.(0), step.(step.(0)), step)
    find_start(0, meet, step)
  end
  defp find_meet(s, f, step) when s == f, do: s
  defp find_meet(s, f, step), do: find_meet(step.(s), step.(step.(f)), step)
  defp find_start(a, b, _) when a == b, do: a
  defp find_start(a, b, step), do: find_start(step.(a), step.(b), step)
end
