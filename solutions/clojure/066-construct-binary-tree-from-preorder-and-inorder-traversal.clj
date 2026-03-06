;; Problem 66: Construct Binary Tree from Preorder and Inorder Traversal (LeetCode 105)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn build-tree [preorder inorder]
  (when (seq preorder)
    (let [r (first preorder)
          [left-in [_ & right-in]] (split-with #(not= % r) inorder)
          n (count left-in)]
      {:val r
       :left (build-tree (take n (rest preorder)) left-in)
       :right (build-tree (drop n (rest preorder)) right-in)})))
