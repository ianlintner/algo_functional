;; Problem 149: Counting Bits (LeetCode 338)
;; Difficulty: Easy
;; Language: Clojure
;; 
(defn count-bits [n]
  (reduce (fn [dp i]
    (conj dp (if (zero? i) 0 (+ (nth dp (bit-shift-right i 1)) (bit-and i 1)))))
    [] (range (inc n))))
