# Problem 10: Rotting Oranges (LeetCode 994)
# Difficulty: Med
# Language: Elixir
# 
defmodule RottingOranges do
  def oranges_rotting(grid) do
    rows = length(grid)
    cols = length(hd(grid))
    cells = for {row, r} <- Enum.with_index(grid),
                {val, c} <- Enum.with_index(row), do: {{r, c}, val}
    rotten = for {{r, c}, 2} <- cells, do: {r, c}
    fresh = MapSet.new(for {{r, c}, 1} <- cells, do: {r, c})
    bfs(rotten, fresh, rows, cols, 0)
  end

  defp bfs([], fresh, _, _, time), do: if MapSet.size(fresh) == 0, do: time, else: -1
  defp bfs(queue, fresh, rows, cols, time) do
    {new_queue, new_fresh} =
      Enum.reduce(queue, {[], fresh}, fn {r, c}, {nq, fr} ->
        [{r-1,c},{r+1,c},{r,c-1},{r,c+1}]
        |> Enum.filter(fn {nr, nc} -> nr >= 0 and nr < rows and nc >= 0 and nc < cols end)
        |> Enum.reduce({nq, fr}, fn pos, {nq2, fr2} ->
          if MapSet.member?(fr2, pos),
            do: {[pos | nq2], MapSet.delete(fr2, pos)},
            else: {nq2, fr2}
        end)
      end)
    if new_queue == [],
      do: (if MapSet.size(new_fresh) == 0, do: time, else: -1),
      else: bfs(new_queue, new_fresh, rows, cols, time + 1)
  end
end
