# Problem 112: Asteroid Collision (LeetCode 735)
# Difficulty: Med
# Language: Elixir
# 
defmodule Asteroids do
  def collision(asteroids) do
    asteroids |> Enum.reduce([], &resolve/2) |> Enum.reverse()
  end
  defp resolve(ast, []), do: [ast]
  defp resolve(ast, [top | rest] = stack) do
    cond do
      ast > 0 or top < 0 -> [ast | stack]
      top == -ast -> rest
      top < -ast -> resolve(ast, rest)
      true -> stack
    end
  end
end
