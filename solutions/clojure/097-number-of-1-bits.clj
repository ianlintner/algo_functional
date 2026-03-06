;; Problem 97: Number of 1 Bits (LeetCode 191)
;; Difficulty: Easy
;; Language: Clojure
;; 
(defn hamming-weight [n]
  (loop [n n cnt 0]
    (if (zero? n) cnt
      (recur (unsigned-bit-shift-right n 1) (+ cnt (bit-and n 1))))))
