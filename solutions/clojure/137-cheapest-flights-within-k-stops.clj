;; Problem 137: Cheapest Flights Within K Stops (LeetCode 787)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn find-cheapest-price [n flights src dst k]
  (let [inf Integer/MAX_VALUE
        init (assoc (vec (repeat n inf)) src 0)
        relax (fn [prices]
                (reduce (fn [next [u v w]]
                  (if (and (< (prices u) inf)
                           (< (+ (prices u) w) (next v)))
                    (assoc next v (+ (prices u) w))
                    next))
                  prices flights))]
    (let [final (nth (iterate relax init) (inc k))]
      (if (= (final dst) inf) -1 (final dst)))))
