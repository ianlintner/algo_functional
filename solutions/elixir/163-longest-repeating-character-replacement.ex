# Problem 163: Longest Repeating Character Replacement (LeetCode 424)
# Difficulty: Med
# Language: Elixir
# 
defmodule CharReplace do
  def character_replacement(s, k) do
    chars = String.graphemes(s)
    {_, _, _, best} = Enum.with_index(chars) |> Enum.reduce({0, 0, %{}, 0}, fn {ch, right}, {left, max_c, freq, best} ->
      freq = Map.update(freq, ch, 1, &(&1 + 1))
      mc = max(max_c, freq[ch])
      if right - left + 1 - mc > k do
        lc = Enum.at(chars, left)
        freq = Map.update!(freq, lc, &(&1 - 1))
        {left + 1, mc, freq, max(best, right - left)}
      else
        {left, mc, freq, max(best, right - left + 1)}
      end
    end)
    best
  end
end
