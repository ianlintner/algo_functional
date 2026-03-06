# Problem 43: Jump Game (LeetCode 55)
# Difficulty: Med
# Language: Elixir
# 
defmodule JumpGame do
  def can_jump(nums) do
    len = length(nums)
    nums
    |> Enum.with_index()
    |> Enum.reduce(0, fn {n, i}, reach ->
      if i > reach, do: -1, else: max(reach, i + n)
    end)
    |> Kernel.>=(len - 1)
  end
end
