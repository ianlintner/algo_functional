# Problem 165: Path Sum III (LeetCode 437)
# Difficulty: Med
# Language: Elixir
# 
defmodule PathSumIII do
  def path_sum(nil, _target), do: 0
  def path_sum(root, target) do
    dfs(root, %{0 => 1}, 0, target)
  end

  defp dfs(nil, _prefix, _curr, _target), do: 0
  defp dfs({val, left, right}, prefix, curr, target) do
    sum = curr + val
    count = Map.get(prefix, sum - target, 0)
    prefix = Map.update(prefix, sum, 1, &(&1 + 1))
    count + dfs(left, prefix, sum, target) + dfs(right, prefix, sum, target)
  end
end
