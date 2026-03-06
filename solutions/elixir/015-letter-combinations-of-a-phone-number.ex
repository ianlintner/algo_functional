# Problem 15: Letter Combinations of a Phone Number (LeetCode 17)
# Difficulty: Med
# Language: Elixir
# 
defmodule LetterCombinations do
  @phone %{
    "2" => ~w(a b c), "3" => ~w(d e f), "4" => ~w(g h i),
    "5" => ~w(j k l), "6" => ~w(m n o), "7" => ~w(p q r s),
    "8" => ~w(t u v), "9" => ~w(w x y z)
  }

  def letter_combinations(""), do: []
  def letter_combinations(digits) do
    digits
    |> String.graphemes()
    |> Enum.reduce([""], fn digit, combos ->
      letters = Map.get(@phone, digit, [])
      for combo <- combos, ch <- letters, do: combo <> ch
    end)
  end
end
