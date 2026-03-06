# Problem 117: Kth Smallest Element in a BST (LeetCode 230)
# Difficulty: Med
# Language: Elixir
# 
defmodule KthSmallest do
  def kth_smallest(nil, _k), do: nil
  def kth_smallest(node, k) do
    inorder(node) |> Enum.at(k - 1)
  end
  defp inorder(nil), do: []
  defp inorder(%{val: v, left: l, right: r}) do
    inorder(l) ++ [v] ++ inorder(r)
  end
end
