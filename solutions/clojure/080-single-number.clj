;; Problem 80: Single Number (LeetCode 136)
;; Difficulty: Easy
;; Language: Clojure
;; 
(defn single-number [nums]
  (reduce bit-xor 0 nums))
