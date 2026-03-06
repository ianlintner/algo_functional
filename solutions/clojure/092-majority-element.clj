;; Problem 92: Majority Element (LeetCode 169)
;; Difficulty: Easy
;; Language: Clojure
;; 
(defn majority-element [nums]
  (first (reduce (fn [[cand cnt] n]
    (cond (zero? cnt) [n 1]
          (= n cand) [cand (inc cnt)]
          :else [cand (dec cnt)]))
    [0 0] nums)))
