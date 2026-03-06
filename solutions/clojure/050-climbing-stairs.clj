;; Problem 50: Climbing Stairs (LeetCode 70)
;; Difficulty: Easy
;; Language: Clojure
;; 
(defn climb-stairs [n]
  (first (reduce (fn [[a b] _] [b (+ a b)]) [1 1] (range n))))
