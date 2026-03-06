# Problem 107: Word Search II (LeetCode 212)
# Difficulty: Hard
# Language: Elixir
# 
defmodule WordSearchII do
  def find_words(board, words) do
    trie = Enum.reduce(words, %{ch: %{}, word: nil}, &trie_ins(&2, &1, 0))
    rows = length(board); cols = length(hd(board))
    g = for {row, r} <- Enum.with_index(board),
            {cell, c} <- Enum.with_index(row), into: %{}, do: {{r, c}, cell}
    for(r <- 0..(rows-1), c <- 0..(cols-1), do: {r, c})
    |> Enum.reduce(MapSet.new(), fn {r, c}, found ->
      dfs(r, c, trie, MapSet.new(), found, g, rows, cols) end)
    |> MapSet.to_list()
  end
  defp trie_ins(node, w, i) when i == byte_size(w), do: %{node | word: w}
  defp trie_ins(node, w, i) do
    c = :binary.at(w, i)
    child = Map.get(node.ch, c, %{ch: %{}, word: nil})
    %{node | ch: Map.put(node.ch, c, trie_ins(child, w, i + 1))}
  end
  defp dfs(r, c, node, seen, found, g, rows, cols) do
    if r < 0 or r >= rows or c < 0 or c >= cols or MapSet.member?(seen, {r, c}),
      do: found,
    else: case Map.get(node.ch, g[{r, c}]) do
      nil -> found
      next ->
        f = if next.word, do: MapSet.put(found, next.word), else: found
        s = MapSet.put(seen, {r, c})
        Enum.reduce([{-1,0},{1,0},{0,-1},{0,1}], f, fn {dr,dc}, acc ->
          dfs(r+dr, c+dc, next, s, acc, g, rows, cols) end)
    end
  end
end
