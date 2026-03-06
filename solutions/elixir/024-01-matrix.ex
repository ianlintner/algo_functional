# Problem 24: 01 Matrix (LeetCode 542)
# Difficulty: Med
# Language: Elixir
# 
defmodule ZeroOneMatrix do
  def update_matrix(mat) do
    rows = length(mat)
    cols = length(hd(mat))
    inf = rows + cols

    initial = for {row, r} <- Enum.with_index(mat) do
      for {v, c} <- Enum.with_index(row), do: if(v == 0, do: 0, else: inf)
    end

    # Top-left pass
    tl = Enum.reduce(0..(rows - 1), %{}, fn r, acc ->
      Enum.reduce(0..(cols - 1), acc, fn c, acc2 ->
        v = Enum.at(Enum.at(initial, r), c)
        top = if r > 0, do: Map.get(acc2, {r-1, c}, inf) + 1, else: inf
        left = if c > 0, do: Map.get(acc2, {r, c-1}, inf) + 1, else: inf
        Map.put(acc2, {r, c}, min(v, min(top, left)))
      end)
    end)

    # Bottom-right pass
    br = Enum.reduce((rows - 1)..0, tl, fn r, acc ->
      Enum.reduce((cols - 1)..0, acc, fn c, acc2 ->
        v = Map.get(acc2, {r, c})
        bottom = if r < rows - 1, do: Map.get(acc2, {r+1, c}, inf) + 1, else: inf
        right = if c < cols - 1, do: Map.get(acc2, {r, c+1}, inf) + 1, else: inf
        Map.put(acc2, {r, c}, min(v, min(bottom, right)))
      end)
    end)

    for r <- 0..(rows - 1), do:
      (for c <- 0..(cols - 1), do: Map.get(br, {r, c}))
  end
end
