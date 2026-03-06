;; Problem 135: Inorder Successor in BST (LeetCode 285)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn inorder-successor [root p]
  (cond
    (nil? root) nil
    (> (:val root) p)
      (or (inorder-successor (:left root) p) (:val root))
    :else (inorder-successor (:right root) p)))
