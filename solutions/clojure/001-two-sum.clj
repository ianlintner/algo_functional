;; Problem 1: Two Sum (LeetCode 1)
;; Difficulty: Easy
;; Language: Clojure
;; 
(defn two-sum [nums target]
  (reduce-kv
    (fn [seen i num]
      (let [complement (- target num)]
        (if-let [j (get seen complement)]
          (reduced [j i])
          (assoc seen num i))))
    {}
    (vec nums)))
