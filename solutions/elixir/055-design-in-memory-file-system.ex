# Problem 55: Design In-Memory File System (LeetCode 588)
# Difficulty: Hard
# Language: Elixir
# 
defmodule FileSystem do
  defstruct children: %{}, content: ""

  def new, do: %FileSystem{}

  def ls(root, path) do
    parts = parse_path(path)
    node = navigate(root, parts)
    if node.content != "",
      do: [List.last(parts)],
      else: node.children |> Map.keys() |> Enum.sort()
  end

  def mkdir(root, path), do: ensure_path(root, parse_path(path))

  def add_content(root, path, content) do
    parts = parse_path(path)
    update_at(root, parts, fn node ->
      %{node | content: node.content <> content}
    end)
  end

  def read_content(root, path), do: navigate(root, parse_path(path)).content

  defp parse_path(path), do: path |> String.split("/") |> Enum.reject(&(&1 == ""))
  defp navigate(node, []), do: node
  defp navigate(node, [h | t]), do: navigate(Map.get(node.children, h, %FileSystem{}), t)
  defp ensure_path(node, []), do: node
  defp ensure_path(node, [h | t]) do
    child = Map.get(node.children, h, %FileSystem{})
    %{node | children: Map.put(node.children, h, ensure_path(child, t))}
  end
  defp update_at(node, [h], f) do
    child = Map.get(node.children, h, %FileSystem{})
    %{node | children: Map.put(node.children, h, f.(child))}
  end
  defp update_at(node, [h | t], f) do
    child = Map.get(node.children, h, %FileSystem{})
    %{node | children: Map.put(node.children, h, update_at(child, t, f))}
  end
end
