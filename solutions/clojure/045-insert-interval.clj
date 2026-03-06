;; Problem 45: Insert Interval (LeetCode 57)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn insert-interval [intervals new-interval]
  (let [all (sort-by first (conj intervals new-interval))]
    (reduce (fn [acc [s e]]
              (if-let [[ps pe] (peek acc)]
                (if (<= s pe)
                  (conj (pop acc) [ps (max pe e)])
                  (conj acc [s e]))
                (conj acc [s e])))
            [] all)))
