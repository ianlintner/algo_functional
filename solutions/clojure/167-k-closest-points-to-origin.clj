;; Problem 167: K Closest Points to Origin (LeetCode 973)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn k-closest [points k]
  (->> points
       (sort-by (fn [[x y]] (+ (* x x) (* y y))))
       (take k)
       vec))
