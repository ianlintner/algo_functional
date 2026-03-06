;; Problem 21: Merge k Sorted Lists (LeetCode 23)
;; Difficulty: Hard
;; Language: Clojure
;; 
(defn merge-k-lists [lists]
  (letfn [(merge2 [l1 l2]
            (cond
              (empty? l1) l2
              (empty? l2) l1
              (<= (first l1) (first l2))
                (cons (first l1) (lazy-seq (merge2 (rest l1) l2)))
              :else
                (cons (first l2) (lazy-seq (merge2 l1 (rest l2))))))]
    (reduce merge2 [] lists)))
