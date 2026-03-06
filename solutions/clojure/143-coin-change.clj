;; Problem 143: Coin Change (LeetCode 322)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn coin-change [coins amount]
  (let [inf (inc amount)
        dp (vec (cons 0 (repeat amount inf)))
        result (reduce (fn [table coin]
                  (vec (map-indexed (fn [i v]
                    (if (>= i coin)
                      (min v (inc (table (- i coin))))
                      v)) table)))
                dp coins)]
    (if (>= (result amount) inf) -1 (result amount))))
