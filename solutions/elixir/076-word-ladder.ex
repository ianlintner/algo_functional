# Problem 76: Word Ladder (LeetCode 127)
# Difficulty: Hard
# Language: Elixir
# 
defmodule WordLadder do
  def ladder_length(begin_word, end_word, word_list) do
    dict = MapSet.new(word_list)
    if not MapSet.member?(dict, end_word), do: 0,
    else: bfs(:queue.from_list([{begin_word, 1}]), MapSet.new([begin_word]), dict, end_word)
  end

  defp bfs(queue, visited, dict, target) do
    case :queue.out(queue) do
      {:empty, _} -> 0
      {{:value, {word, depth}}, rest} ->
        if word == target, do: depth,
        else: (
          nexts = neighbors(word, dict) |> Enum.reject(&MapSet.member?(visited, &1))
          vis = Enum.reduce(nexts, visited, &MapSet.put(&2, &1))
          q = Enum.reduce(nexts, rest, fn w, q -> :queue.in({w, depth+1}, q) end)
          bfs(q, vis, dict, target))
    end
  end

  defp neighbors(w, dict) do
    w |> String.graphemes() |> Enum.with_index()
    |> Enum.flat_map(fn {_, i} ->
      Enum.map(?a..?z, fn c ->
        String.slice(w, 0, i) <> <<c>> <> String.slice(w, (i+1)..-1//1)
      end)
    end)
    |> Enum.filter(&MapSet.member?(dict, &1))
  end
end
