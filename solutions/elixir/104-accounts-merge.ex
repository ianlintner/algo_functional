# Problem 104: Accounts Merge (LeetCode 721)
# Difficulty: Med
# Language: Elixir
# 
defmodule AccountsMerge do
  def merge(accounts) do
    {uf, owner} = Enum.reduce(accounts, {%{}, %{}}, fn [name | emails], {u, o} ->
      Enum.reduce(emails, {u, o}, fn e, {u2, o2} ->
        {union(u2, hd(emails), e), Map.put(o2, e, name)}
      end)
    end)
    groups = owner |> Map.keys() |> Enum.group_by(fn e ->
      {_, root} = find(uf, e); root end)
    Enum.map(Map.values(groups), fn es ->
      [owner[hd(es)] | Enum.sort(es)] end)
  end
  defp find(uf, x) do
    case Map.get(uf, x) do
      nil -> {Map.put(uf, x, x), x}
      ^x -> {uf, x}
      p -> {u, r} = find(uf, p); {Map.put(u, x, r), r}
    end
  end
  defp union(uf, a, b) do
    {u1, ra} = find(uf, a); {u2, rb} = find(u1, b)
    if ra == rb, do: u2, else: Map.put(u2, ra, rb)
  end
end
