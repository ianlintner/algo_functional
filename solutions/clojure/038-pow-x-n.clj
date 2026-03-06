;; Problem 38: Pow(x, n) (LeetCode 50)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn my-pow [x n]
  (cond
    (zero? n) 1.0
    (neg? n)  (my-pow (/ 1.0 x) (- n))
    (even? n) (my-pow (* x x) (quot n 2))
    :else     (* x (my-pow (* x x) (quot n 2)))))
