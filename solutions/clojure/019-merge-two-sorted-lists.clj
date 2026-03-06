;; Problem 19: Merge Two Sorted Lists (LeetCode 21)
;; Difficulty: Easy
;; Language: Clojure
;; 
(defn merge-two-lists [l1 l2]
  (cond
    (empty? l1) l2
    (empty? l2) l1
    (<= (first l1) (first l2))
      (cons (first l1) (lazy-seq (merge-two-lists (rest l1) l2)))
    :else
      (cons (first l2) (lazy-seq (merge-two-lists l1 (rest l2))))))
