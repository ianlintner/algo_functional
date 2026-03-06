;; Problem 164: Non-overlapping Intervals (LeetCode 435)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn erase-overlap-intervals [intervals]
  (let [sorted (sort-by second intervals)]
    (first
      (reduce (fn [[cnt end] [s e]]
                (if (< s end) [(inc cnt) end] [cnt e]))
              [0 Long/MIN_VALUE] sorted))))
