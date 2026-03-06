# Problem 155: Ransom Note (LeetCode 383)
# Difficulty: Easy
# Language: Elixir
# 
defmodule RansomNote do
  def can_construct(note, magazine) do
    freq = String.graphemes(magazine) |> Enum.frequencies()
    String.graphemes(note)
    |> Enum.reduce_while(freq, fn ch, f ->
      cnt = Map.get(f, ch, 0)
      if cnt > 0, do: {:cont, Map.put(f, ch, cnt - 1)}, else: {:halt, nil}
    end) != nil
  end
end
