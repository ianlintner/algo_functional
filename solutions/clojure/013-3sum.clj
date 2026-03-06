;; Problem 13: 3Sum (LeetCode 15)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn three-sum [nums]
  (let [sorted (vec (sort nums))
        n (count sorted)]
    (loop [i 0, result []]
      (if (>= i n) result
        (if (and (> i 0) (= (sorted i) (sorted (dec i))))
          (recur (inc i) result)
          (let [target (- (sorted i))
                trips (loop [l (inc i), r (dec n), acc []]
                        (if (>= l r) acc
                          (let [s (+ (sorted l) (sorted r))]
                            (cond
                              (< s target) (recur (inc l) r acc)
                              (> s target) (recur l (dec r) acc)
                              :else (let [nl (loop [ll (inc l)]
                                            (if (and (< ll r) (= (sorted ll) (sorted l)))
                                              (recur (inc ll)) ll))]
                                     (recur nl (dec r)
                                       (conj acc [(- target) (sorted l) (sorted r)])))))))]
            (recur (inc i) (into result trips))))))))
