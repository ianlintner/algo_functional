;; Problem 60: Validate Binary Search Tree (LeetCode 98)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn valid-bst? [node lo hi]
  (if (nil? node) true
    (let [{:keys [val left right]} node]
      (and (> val lo) (< val hi)
           (valid-bst? left lo val)
           (valid-bst? right val hi)))))
