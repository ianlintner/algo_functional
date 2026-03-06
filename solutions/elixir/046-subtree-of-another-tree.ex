# Problem 46: Subtree of Another Tree (LeetCode 572)
# Difficulty: Easy
# Language: Elixir
# 
defmodule SubtreeCheck do
  def is_subtree(nil, nil), do: true
  def is_subtree(nil, _sub), do: false
  def is_subtree(root, sub) do
    same_tree?(root, sub) or
      is_subtree(root.left, sub) or
      is_subtree(root.right, sub)
  end

  defp same_tree?(nil, nil), do: true
  defp same_tree?(nil, _), do: false
  defp same_tree?(_, nil), do: false
  defp same_tree?(a, b) do
    a.val == b.val and same_tree?(a.left, b.left) and same_tree?(a.right, b.right)
  end
end
