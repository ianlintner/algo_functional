;; Problem 121: Lowest Common Ancestor of a Binary Tree (LeetCode 236)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn lca [root p q]
  (cond
    (nil? root) nil
    (or (= (:val root) p) (= (:val root) q)) root
    :else
    (let [left (lca (:left root) p q)
          right (lca (:right root) p q)]
      (cond
        (and left right) root
        left left
        :else right))))
