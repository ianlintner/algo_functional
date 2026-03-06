# Problem 160: Partition Equal Subset Sum (LeetCode 416)
# Difficulty: Med
# Language: Elixir
# 
defmodule PartitionSum do
  def can_partition(nums) do
    total = Enum.sum(nums)
    if rem(total, 2) != 0, do: false,
    else: (
      target = div(total, 2)
      dp = Enum.reduce(nums, MapSet.new([0]), fn n, dp ->
        MapSet.union(dp, MapSet.new(Enum.map(MapSet.to_list(dp), &(&1 + n))))
      end)
      MapSet.member?(dp, target)
    )
  end
end
