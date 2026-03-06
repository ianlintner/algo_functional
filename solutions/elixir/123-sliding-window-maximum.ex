# Problem 123: Sliding Window Maximum (LeetCode 239)
# Difficulty: Hard
# Language: Elixir
# 
defmodule SlidingMax do
  def max_sliding_window(nums, k) do
    indexed = Enum.with_index(nums)
    {_, res} = Enum.reduce(indexed, {:queue.new(), []}, fn {v, i}, {dq, res} ->
      dq = clean_front(dq, i, k)
      dq = clean_back(dq, nums, v)
      dq = :queue.in(i, dq)
      {:value, front} = :queue.peek(dq)
      res = if i >= k - 1, do: res ++ [Enum.at(nums, front)], else: res
      {dq, res}
    end)
    res
  end
  defp clean_front(dq, i, k) do
    case :queue.peek(dq) do
      {:value, j} when j <= i - k -> clean_front(:queue.drop(dq), i, k)
      _ -> dq
    end
  end
  defp clean_back(dq, nums, v) do
    case :queue.peek_r(dq) do
      {:value, j} when elem(nums, j) <= v -> clean_back(:queue.drop_r(dq), nums, v)
      _ -> dq
    end
  end
end
