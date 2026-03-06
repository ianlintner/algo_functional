# Problem 88: Maximum Width of Binary Tree (LeetCode 662)
# Difficulty: Med
# Language: Elixir
# 
defmodule MaxWidth do
  def width(nil), do: 0
  def width(root), do: bfs([{root, 0}], 0)

  defp bfs([], max_w), do: max_w
  defp bfs(level, max_w) do
    {_, first_i} = hd(level)
    {_, last_i} = List.last(level)
    w = last_i - first_i + 1
    next = Enum.flat_map(level, fn
      {%{left: l, right: r}, i} ->
        (if l, do: [{l, 2 * i}], else: []) ++
        (if r, do: [{r, 2 * i + 1}], else: [])
    end)
    bfs(next, max(w, max_w))
  end
end
