# Problem 111: Flood Fill (LeetCode 733)
# Difficulty: Easy
# Language: Elixir
# 
defmodule FloodFill do
  def fill(image, sr, sc, color) do
    orig = image |> Enum.at(sr) |> Enum.at(sc)
    if orig == color, do: image, else: do_fill(image, sr, sc, color, orig)
  end
  defp do_fill(img, r, c, color, orig) do
    rows = length(img); cols = length(hd(img))
    if r < 0 or r >= rows or c < 0 or c >= cols do img
    else
      if Enum.at(Enum.at(img, r), c) != orig do img
      else
        updated = List.update_at(img, r, &List.replace_at(&1, c, color))
        [{-1,0},{1,0},{0,-1},{0,1}]
        |> Enum.reduce(updated, fn {dr, dc}, acc ->
          do_fill(acc, r+dr, c+dc, color, orig) end)
      end
    end
  end
end
