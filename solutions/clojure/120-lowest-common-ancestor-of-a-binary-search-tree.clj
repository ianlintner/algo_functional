;; Problem 120: Lowest Common Ancestor of a Binary Search Tree (LeetCode 235)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn lca-bst [root p q]
  (cond
    (nil? root) nil
    (and (< p (:val root)) (< q (:val root)))
      (lca-bst (:left root) p q)
    (and (> p (:val root)) (> q (:val root)))
      (lca-bst (:right root) p q)
    :else (:val root)))
