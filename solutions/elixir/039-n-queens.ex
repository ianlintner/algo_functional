# Problem 39: N-Queens (LeetCode 51)
# Difficulty: Hard
# Language: Elixir
# 
defmodule NQueens do
  def solve_n_queens(n) do
    go(0, n, MapSet.new(), MapSet.new(), MapSet.new(), [])
    |> Enum.map(fn board ->
      Enum.map(board, fn c ->
        String.duplicate(".", c) <> "Q" <> String.duplicate(".", n - c - 1)
      end)
    end)
  end

  defp go(n, n, _cols, _d1, _d2, board), do: [Enum.reverse(board)]
  defp go(row, n, cols, d1, d2, board) do
    Enum.flat_map(0..(n - 1), fn c ->
      if not MapSet.member?(cols, c) and
         not MapSet.member?(d1, row - c) and
         not MapSet.member?(d2, row + c) do
        go(row + 1, n, MapSet.put(cols, c),
           MapSet.put(d1, row - c), MapSet.put(d2, row + c), [c | board])
      else
        []
      end
    end)
  end
end
