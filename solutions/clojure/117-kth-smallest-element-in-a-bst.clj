;; Problem 117: Kth Smallest Element in a BST (LeetCode 230)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn kth-smallest [root k]
  (letfn [(inorder [node]
            (if (nil? node) []
              (concat (inorder (:left node))
                      [(:val node)]
                      (inorder (:right node)))))]
    (nth (inorder root) (dec k))))
