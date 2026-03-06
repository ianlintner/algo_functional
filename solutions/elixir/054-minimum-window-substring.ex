# Problem 54: Minimum Window Substring (LeetCode 76)
# Difficulty: Hard
# Language: Elixir
# 
defmodule MinWindow do
  def min_window(s, t) do
    need = t |> String.graphemes() |> Enum.frequencies()
    keys = map_size(need)
    chars = String.graphemes(s)
    {start, len} = slide(chars, 0, 0, 0, %{}, need, keys, {0, :infinity})
    if len == :infinity, do: "", else: chars |> Enum.slice(start, len) |> Enum.join()
  end

  defp slide(chars, l, r, have, win, need, keys, best) do
    if r >= length(chars), do: best,
    else: (
      c = Enum.at(chars, r)
      win = Map.update(win, c, 1, &(&1 + 1))
      have = if Map.get(win, c) == Map.get(need, c), do: have + 1, else: have
      {l, have, win, best} = shrink(chars, l, r, have, win, need, keys, best)
      slide(chars, l, r + 1, have, win, need, keys, best)
    )
  end

  defp shrink(chars, l, r, have, win, need, keys, best) do
    if have < keys, do: {l, have, win, best},
    else: (
      best = if r - l + 1 < elem(best, 1), do: {l, r - l + 1}, else: best
      lc = Enum.at(chars, l)
      win = Map.update!(win, lc, &(&1 - 1))
      have = if Map.get(win, lc, 0) < Map.get(need, lc, 0), do: have - 1, else: have
      shrink(chars, l + 1, r, have, win, need, keys, best)
    )
  end
end
