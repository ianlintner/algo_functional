# Problem 72: Smallest Range Covering Elements from K Lists (LeetCode 632)
# Difficulty: Hard
# Language: Elixir
# 
defmodule SmallestRange do
  def solve(nums) do
    tagged = nums |> Enum.with_index() |> Enum.flat_map(fn {list, i} ->
      Enum.map(list, &{&1, i})
    end) |> Enum.sort()
    k = length(nums)
    slide(tagged, 0, %{}, 0, {-1_000_000, 1_000_000}, tagged, k)
  end

  defp slide([], _, _, _, best, _, _), do: Tuple.to_list(best)
  defp slide([{v, g} | rest], left, counts, covered, best, sorted, k) do
    c2 = Map.update(counts, g, 1, &(&1 + 1))
    cov2 = if Map.get(counts, g, 0) == 0, do: covered + 1, else: covered
    {l2, c3, cov3, b2} = shrink(left, c2, cov2, best, v, sorted, k)
    slide(rest, l2, c3, cov3, b2, sorted, k)
  end

  defp shrink(l, counts, cov, best, rv, sorted, k) when cov < k, do: {l, counts, cov, best}
  defp shrink(l, counts, cov, best, rv, sorted, k) do
    {lv, lg} = Enum.at(sorted, l)
    nb = if rv - lv < elem(best,1) - elem(best,0), do: {lv, rv}, else: best
    c2 = Map.update!(counts, lg, &(&1 - 1))
    cov2 = if c2[lg] == 0, do: cov - 1, else: cov
    shrink(l + 1, c2, cov2, nb, rv, sorted, k)
  end
end
