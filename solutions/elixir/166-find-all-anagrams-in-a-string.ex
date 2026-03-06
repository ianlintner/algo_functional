# Problem 166: Find All Anagrams in a String (LeetCode 438)
# Difficulty: Med
# Language: Elixir
# 
defmodule Anagrams do
  def find_anagrams(s, p) do
    p_freq = p |> String.graphemes() |> Enum.frequencies()
    p_len = String.length(p)
    chars = String.graphemes(s)
    chars
    |> Enum.with_index()
    |> Enum.reduce({[], 0, %{}}, fn {ch, right}, {result, left, w_freq} ->
      w_freq = Map.update(w_freq, ch, 1, &(&1 + 1))
      {left, w_freq} = if right - left + 1 > p_len do
        lc = Enum.at(chars, left)
        wf = Map.update!(w_freq, lc, &(&1 - 1))
        wf = if wf[lc] == 0, do: Map.delete(wf, lc), else: wf
        {left + 1, wf}
      else
        {left, w_freq}
      end
      if right - left + 1 == p_len and w_freq == p_freq,
        do: {[left | result], left, w_freq},
        else: {result, left, w_freq}
    end)
    |> elem(0)
    |> Enum.reverse()
  end
end
