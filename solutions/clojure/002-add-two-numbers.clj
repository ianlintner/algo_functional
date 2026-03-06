;; Problem 2: Add Two Numbers (LeetCode 2)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn add-two-numbers [l1 l2]
  (loop [n1 l1, n2 l2, carry 0, acc []]
    (if (and (empty? n1) (empty? n2) (zero? carry))
      (reverse acc)
      (let [v1 (or (first n1) 0)
            v2 (or (first n2) 0)
            s  (+ v1 v2 carry)]
        (recur (rest n1) (rest n2) (quot s 10) (conj acc (rem s 10)))))))
