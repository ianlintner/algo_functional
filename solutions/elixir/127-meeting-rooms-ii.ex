# Problem 127: Meeting Rooms II (LeetCode 253)
# Difficulty: Med
# Language: Elixir
# 
defmodule MeetingRooms2 do
  def min_rooms(intervals) do
    starts = intervals |> Enum.map(&elem(&1, 0)) |> Enum.sort()
    ends = intervals |> Enum.map(&elem(&1, 1)) |> Enum.sort()
    go(starts, ends, 0, 0)
  end
  defp go([], _ends, _rooms, max_r), do: max_r
  defp go([s | ss], [e | es] = ends, rooms, max_r) do
    if s < e,
      do: go(ss, ends, rooms + 1, max(max_r, rooms + 1)),
      else: go(ss, es, rooms, max_r)
  end
end
