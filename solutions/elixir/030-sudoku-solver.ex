# Problem 30: Sudoku Solver (LeetCode 37)
# Difficulty: Hard
# Language: Elixir
# 
defmodule SudokuSolver do
  def solve(board) do
    case find_empty(board) do
      nil -> board
      {r, c} ->
        Enum.find_value(1..9, board, fn d ->
          ds = Integer.to_string(d)
          if valid?(board, r, c, ds) do
            new_board = put_in(board, [Access.at(r), Access.at(c)], ds)
            result = solve(new_board)
            if solved?(result), do: result, else: nil
          end
        end) || board
    end
  end

  defp find_empty(board) do
    Enum.reduce_while(0..8, nil, fn i, _ ->
      case Enum.find_index(Enum.at(board, i), &(&1 == ".")) do
        nil -> {:cont, nil}
        j -> {:halt, {i, j}}
      end
    end)
  end

  defp solved?(board), do: not Enum.any?(board, fn row -> Enum.member?(row, ".") end)

  defp valid?(board, r, c, d) do
    row = Enum.at(board, r)
    col = Enum.map(board, &Enum.at(&1, c))
    br = div(r, 3) * 3; bc = div(c, 3) * 3
    box = for i <- br..(br+2), j <- bc..(bc+2), do: board |> Enum.at(i) |> Enum.at(j)
    d not in row and d not in col and d not in box
  end
end
