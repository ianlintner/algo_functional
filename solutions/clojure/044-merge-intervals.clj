;; Problem 44: Merge Intervals (LeetCode 56)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn merge-intervals [intervals]
  (reduce (fn [acc [s e]]
            (if-let [[ps pe] (peek acc)]
              (if (<= s pe)
                (conj (pop acc) [ps (max pe e)])
                (conj acc [s e]))
              (conj acc [s e])))
          []
          (sort-by first intervals)))
