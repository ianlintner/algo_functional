;; Problem 51: Set Matrix Zeroes (LeetCode 73)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn set-zeroes [matrix]
  (let [zero-rows (set (keep-indexed #(when (some zero? %2) %1) matrix))
        cols (count (first matrix))
        zero-cols (set (filter #(some (fn [r] (zero? (nth r %))) matrix) (range cols)))]
    (map-indexed (fn [i row]
      (map-indexed (fn [j v]
        (if (or (zero-rows i) (zero-cols j)) 0 v)) row)) matrix)))
