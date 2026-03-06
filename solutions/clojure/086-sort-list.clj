;; Problem 86: Sort List (LeetCode 148)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn sort-list [xs]
  (if (<= (count xs) 1) xs
    (let [mid (quot (count xs) 2)
          l (sort-list (take mid xs))
          r (sort-list (drop mid xs))]
      (loop [a l b r acc []]
        (cond (empty? a) (into acc b)
              (empty? b) (into acc a)
              (<= (first a) (first b)) (recur (rest a) b (conj acc (first a)))
              :else (recur a (rest b) (conj acc (first b))))))))
