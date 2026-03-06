# Problem 126: Meeting Rooms (LeetCode 252)
# Difficulty: Easy
# Language: Elixir
# 
defmodule MeetingRooms do
  def can_attend(intervals) do
    intervals
    |> Enum.sort_by(&elem(&1, 0))
    |> Enum.chunk_every(2, 1, :discard)
    |> Enum.all?(fn [{_, e}, {s, _}] -> e <= s end)
  end
end
