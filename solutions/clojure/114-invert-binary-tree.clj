;; Problem 114: Invert Binary Tree (LeetCode 226)
;; Difficulty: Easy
;; Language: Clojure
;; 
(defn invert-tree [root]
  (when root
    {:val (:val root)
     :left (invert-tree (:right root))
     :right (invert-tree (:left root))}))
