;; Problem 67: Convert Sorted Array to Binary Search Tree (LeetCode 108)
;; Difficulty: Easy
;; Language: Clojure
;; 
(defn sorted-array-to-bst [nums]
  (when (seq nums)
    (let [mid (quot (count nums) 2)]
      {:val (nth nums mid)
       :left (sorted-array-to-bst (subvec nums 0 mid))
       :right (sorted-array-to-bst (subvec nums (inc mid)))})))
