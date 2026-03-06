;; Problem 65: Maximum Depth of Binary Tree (LeetCode 104)
;; Difficulty: Easy
;; Language: Clojure
;; 
(defn max-depth [node]
  (if (nil? node) 0
    (inc (max (max-depth (:left node))
              (max-depth (:right node))))))
