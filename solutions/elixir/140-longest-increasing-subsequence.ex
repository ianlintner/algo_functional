# Problem 140: Longest Increasing Subsequence (LeetCode 300)
# Difficulty: Med
# Language: Elixir
# 
defmodule Solution do
  def length_of_lis(nums) do
    Enum.reduce(nums, [], fn num, tails ->
      pos = bisect(tails, num, 0, length(tails))
      if pos == length(tails) do
        tails ++ [num]
      else
        List.replace_at(tails, pos, num)
      end
    end) |> length()
  end

  defp bisect(_, _, lo, hi) when lo >= hi, do: lo
  defp bisect(tails, target, lo, hi) do
    mid = lo + div(hi - lo, 2)
    if Enum.at(tails, mid) < target,
      do: bisect(tails, target, mid + 1, hi),
      else: bisect(tails, target, lo, mid)
  end
end
