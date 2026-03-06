;; Problem 33: First Missing Positive (LeetCode 41)
;; Difficulty: Hard
;; Language: Clojure
;; 
(defn first-missing-positive [nums]
  (let [s (set (filter pos? nums))]
    (first (drop-while s (iterate inc 1)))))
