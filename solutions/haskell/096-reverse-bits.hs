{-
  Problem 96: Reverse Bits (LeetCode 190)
  Difficulty: Easy
  Language: Haskell
-}
import Data.Bits

reverseBits :: Int -> Int
reverseBits n = foldl step 0 [0..31]
  where step acc i = acc .|. (((n \`shiftR\` i) .&. 1) \`shiftL\` (31 - i))
