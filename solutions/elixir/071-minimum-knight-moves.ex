# Problem 71: Minimum Knight Moves (LeetCode 1197)
# Difficulty: Med
# Language: Elixir
# 
defmodule MinKnight do
  def min_moves(x, y) do
    bfs(:queue.from_list([{0, 0, 0}]), MapSet.new([{0, 0}]), abs(x), abs(y))
  end

  defp bfs(queue, visited, tx, ty) do
    case :queue.out(queue) do
      {:empty, _} -> -1
      {{:value, {cx, cy, d}}, rest} ->
        if cx == tx and cy == ty do
          d
        else
          moves = [{1,2},{2,1},{2,-1},{1,-2},{-1,-2},{-2,-1},{-2,1},{-1,2}]
          nexts = for {dx, dy} <- moves,
                     nx = cx+dx, ny = cy+dy,
                     nx >= -2, ny >= -2,
                     not MapSet.member?(visited, {nx, ny}),
                     do: {nx, ny, d+1}
          new_vis = Enum.reduce(nexts, visited, fn {a,b,_}, s -> MapSet.put(s, {a,b}) end)
          new_q = Enum.reduce(nexts, rest, fn item, q -> :queue.in(item, q) end)
          bfs(new_q, new_vis, tx, ty)
        end
    end
  end
end
