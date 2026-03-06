;; Problem 96: Reverse Bits (LeetCode 190)
;; Difficulty: Easy
;; Language: Clojure
;; 
(defn reverse-bits [n]
  (reduce (fn [acc i]
    (bit-or acc (bit-shift-left (bit-and (unsigned-bit-shift-right n i) 1) (- 31 i))))
    0 (range 32)))
