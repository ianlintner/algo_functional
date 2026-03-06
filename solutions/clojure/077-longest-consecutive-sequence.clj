;; Problem 77: Longest Consecutive Sequence (LeetCode 128)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn longest-consecutive [nums]
  (let [s (set nums)]
    (reduce (fn [mx n]
              (if (s (dec n)) mx
                (max mx (count (take-while s (iterate inc n))))))
            0 s)))
