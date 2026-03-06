;; Problem 98: House Robber (LeetCode 198)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn rob [nums]
  (first (reduce (fn [[p1 p2] n] [(max p1 (+ p2 n)) p1]) [0 0] nums)))
