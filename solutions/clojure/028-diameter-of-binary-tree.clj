;; Problem 28: Diameter of Binary Tree (LeetCode 543)
;; Difficulty: Easy
;; Language: Clojure
;; 
(defn diameter-of-binary-tree [root]
  (letfn [(dfs [node]
            (if (nil? node) [0 0]
              (let [[lh ld] (dfs (:left node))
                    [rh rd] (dfs (:right node))]
                [(inc (max lh rh))
                 (max (+ lh rh) ld rd)])))]
    (second (dfs root))))
